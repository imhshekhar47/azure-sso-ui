import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from "@azure/msal-angular";
import { lastValueFrom, Observable } from 'rxjs';
import { AppRole, AppScope, AppUser, UserProfile } from '../types';
import { RoleApiService } from './roles-api';

@Injectable({ providedIn: 'root' })
export class UserApiService {

    private _baseUrl: string;

    constructor(
        private _httpClient: HttpClient,
        private _msalSvc: MsalService,
        private _roleSvc: RoleApiService,
    ) {
        this._baseUrl = "https://graph.microsoft.com/v1.0";
    }

    private _getUrl(apiPath: string): string {
        return `${this._baseUrl}${apiPath}`
    }

    private _getProfile(): Observable<UserProfile> {
        return this._httpClient.get<UserProfile>(this._getUrl("/me"));
    }


    async resolveUser() {
        const account = this._msalSvc.instance.getActiveAccount()!!;
        console.log(account);

        const groups: Array<string> = account.idTokenClaims && account.idTokenClaims['groups'] ? account.idTokenClaims['groups'] as Array<string> : ['role_user'];
        const roles = groups
            .map((group: string) => group.replaceAll('Prelive_APP12781_', ''))
            .map((group: string) => group.replaceAll("_group", ""))
            .map((name: string) => "role_" + name)
            .map((role: string) => role as AppRole)
            //.filter((role: AppRole) => role !== 'role_admin') // skip admin
            //.filter((role: AppRole) => role !== 'role_user')  // skip user
            ;

        const accessibility = await (async (roles: Array<AppRole>) => {
            const accessDetails = await lastValueFrom(this._roleSvc.getAccess(roles.join(",")));
            console.log(accessDetails);
            return accessDetails;
        })(roles);

        let permission = await (async (roles: Array<AppRole>, outcome: Array<AppScope>) => {
            for (const id of roles) {
                const role = await lastValueFrom(this._roleSvc.getRoleById(id));
                role.permissions?.forEach((p) => outcome.push(p.code as AppScope));
            }
            return outcome
        })(roles, []);

        return new AppUser(
            account.username, 
            account.name, 
            accessibility.details.map(m => m.role), // roles
            accessibility.details.flatMap(m => m.permissions));
    }
}