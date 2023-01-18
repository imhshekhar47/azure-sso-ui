import { Component, OnInit, Input } from '@angular/core';
import { RoleApiService } from 'src/app/services/roles-api';
import { UserApiService } from 'src/app/services/user.service';
import { AppRole, AppScope, AppUser } from 'src/app/types';

@Component({
    selector: 'hs-user-access',
    template: `<div class="hs-user-access">
        <div class="flex column auto">
            <div class="field-name pb-1">{{ title }}</div>
            <mat-divider></mat-divider>
            <div class="">
                <mat-list role="list">
                    <mat-list-item *ngFor="let item of accesses">
                        <span class="mat-body-2">{{ item }}</span>
                    </mat-list-item>
                </mat-list>
            </div>
        </div>
    </div>`,
    styles: [`
    .hs-user-access {
        flex: 1;
    }
    .field-name {
        font-size: 120%;
        font-weight: 400;
    }
    `]
})
export class UserAccessComponent {
    @Input() title!: 'Roles' | 'Permissions' ;
    @Input() accesses: Array<AppRole | AppScope> | undefined;

    constructor(){}
}

@Component({
    selector: 'hs-user-profile',
    template: `<div class="hs-user-profile" *ngIf="user">
        <h1 class="pt-2 mat-headline-6"> {{ user.name }} </h1>
        <mat-card>
            <mat-card-content>
                <div class="content">
                    <hs-field-value name="Email" [value]="user.username"></hs-field-value>
                </div>
            </mat-card-content>
        </mat-card>
        <br />
        <mat-card>
            <mat-card-content class="content">
                <div class="flex row">
                    <hs-user-access class="flex auto pr-1" title="Roles" [accesses]="user.roles"></hs-user-access>
                    <hs-user-access class="flex auto pl-1" title="Permissions" [accesses]="user.permissions"></hs-user-access>
                </div>
            </mat-card-content>
        </mat-card>

        {{ user | json}}
    </div>`,
    styles: [`

    `]
})

export class UserProfileComponent implements OnInit {

    @Input() user!: AppUser;

    constructor(private _userSvc: UserApiService, private _roleSvc: RoleApiService) { }

    ngOnInit() {
        this._userSvc.resolveUser()
            .then( data => {
                this.user = data;
            })
    }

    get roles(): string {
        return this.user.roles?.join(", ") || "";
    }
}