import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessDetails, Permission, Role } from '../types';


@Injectable({ providedIn: 'root' })
export class RoleApiService {

    private _base_url = environment.apiEndpoints.roleApi;

    constructor(private _httpClient: HttpClient) { }


    private _getUrl(apiPath: string): string {
        return `${this._base_url}${apiPath}`;
    }

    getRoleById(id: string): Observable<Role> {
        return this._httpClient
            .get<Role>(
                this._getUrl(`/api/role/${id}`));
    }

    getPermissionById(id: string): Observable<Permission> {
        return this._httpClient
            .get<Permission>(
                this._getUrl(`/api/permission/${id}`));
    }

    getAccess(roleCSV: string): Observable<AccessDetails> {
        return this._httpClient
            .get<AccessDetails>(
                this._getUrl(`/api/access?roles=${roleCSV}`));
    }

}