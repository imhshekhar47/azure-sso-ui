import { Component, OnInit } from '@angular/core';
import { GraphApiService } from '../services';
import { AppUser, UndefinedUser } from '../types/user';


@Component({
    selector: 'hs-main',
    template: `<div class="hs-main">
        <hs-navigation-control *ngIf="user" [user]="user"></hs-navigation-control>
    </div>`,
})
export class MainComponent implements OnInit {

    user: AppUser | undefined;

    constructor(private _graphApi: GraphApiService) { }

    ngOnInit() {
        this._graphApi.getProfile()
            .subscribe((result) => {
                const { id, userPrincipalName, displayName, givenName, mail, officeLocation, } = result 
                this.user = new AppUser(userPrincipalName!!,{...result}, ['role_user', 'role_admin', 'role_uk'], ['scope_customer:read'])
                console.log(this.user);
            })
    }
}