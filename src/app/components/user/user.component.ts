import { Component, OnInit, Input } from '@angular/core';
import { UserApiService } from 'src/app/services/user.service';
import { AppLink, AppUser } from 'src/app/types';

@Component({
    selector: 'hs-user',
    template: `<div *ngIf="user" class="hs-user">
        <hs-page 
            title="User"
            [links]="links">
        </hs-page>
    </div>`
})

export class UserComponent implements OnInit {
    @Input() user!: AppUser;

    links: Array<AppLink> = [
        { label: 'Profile', path: '/app/user/profile'},
    ];

    constructor(private _userSvc: UserApiService) { }

    ngOnInit() {
        this._userSvc.resolveUser()
            .then( data => {
                this.user = data;
            })
    }
}