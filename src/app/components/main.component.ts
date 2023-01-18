import { Component, OnInit, OnDestroy } from '@angular/core';
import { GraphApiService } from '../services';
import { RoleApiService } from '../services/roles-api';
import { AppUser, UndefinedUser } from '../types/user';
import { filter, takeUntil, Subject } from 'rxjs';
import { UserApiService } from '../services/user.service';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {  AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';


@Component({
    selector: 'hs-main',
    template: `<div class="hs-main">
        <mat-progress-bar *ngIf="!user" mode="indeterminate" color="accent"></mat-progress-bar>
        <hs-navigation-control *ngIf="user" [user]="user"></hs-navigation-control>
    </div>`,
    providers: [UserApiService]
})
export class MainComponent implements OnInit, OnDestroy {

    user: AppUser | undefined;

    private unsubscribe = new Subject<void>();
    constructor(
        private _msalSvc: MsalService,
        private _msalBroadcastSvc: MsalBroadcastService,
        private _userSvc: UserApiService,
        private _graphApi: GraphApiService,
        private _roleApi: RoleApiService) { }

    ngOnInit() {
        this._msalBroadcastSvc.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this._setAciveAccount();
            });

        this._msalBroadcastSvc.msalSubject$
            .pipe(
                filter((message: EventMessage) => message.eventType === EventType.LOGIN_SUCCESS),
                takeUntil(this.unsubscribe)
            )
            .subscribe((message: EventMessage) => {
                const result = message.payload as AuthenticationResult;
                this._msalSvc.instance.setActiveAccount(result.account);
            })
            
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private _setAciveAccount() {
        let activeAccount =  this._msalSvc.instance.getActiveAccount();
        if(!activeAccount && this._msalSvc.instance.getAllAccounts().length > 0) {
            activeAccount = this._msalSvc.instance.getAllAccounts()[0];
            this._msalSvc.instance.setActiveAccount(activeAccount);
        }

        this._userSvc.resolveUser()
            .then(data =>  {
                this.user = data;
                console.log(this.user);
            })
    }
}