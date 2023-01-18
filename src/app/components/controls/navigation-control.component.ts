import { Component, OnInit, Input } from '@angular/core';
import { MsalService } from "@azure/msal-angular";
import { AppUser } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'hs-navigation-control',
    template: `<div class="hs-navigation-control fullheight">
    <mat-drawer-container autosize class="fullheight">
        <mat-drawer #drawer mode="side" [opened]="true">
            <hs-sidemenu-control [user]="user"></hs-sidemenu-control>
        </mat-drawer>
        <mat-toolbar color="primary">
            <mat-toolbar-row>
                <img src="/assets/logo.png" height="36" />
                <button mat-icon-button class="example-icon" (click)="drawer.toggle()">
                    <mat-icon>menu</mat-icon>
                </button>
                <span>${environment.title}</span>
            <span class="flex auto"></span>
            <div class="flex row center">
                <button mat-button class="mat-body pl-1 pr-1" routerLink="/app/user"> {{ user.name || user.username }} </button>
                <button mat-button color="accent" sze="xs" (click)="logout()"><mat-icon>logout</mat-icon>Logout</button>
            </div>
            </mat-toolbar-row>
        </mat-toolbar>
        <router-outlet></router-outlet>
    </mat-drawer-container>
</div>`
})

export class NavigationControlComponent implements OnInit {
    @Input() user!: AppUser;

    constructor(private _msalSvc: MsalService) { }

    ngOnInit() { }

    logout() {
        const account = this._msalSvc.instance.getActiveAccount();
        this._msalSvc.instance.setActiveAccount(null);
        this._msalSvc.instance.logout({
            account: account,
            postLogoutRedirectUri: "https://localhost:4200/home",
        })

    }
}