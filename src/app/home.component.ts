import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'hs-home',
    template: `<div class="hs-home">
        <div class="flex column center">
            <h1 class="mt-4 mb-4">{{title}}</h1>

            <mat-card>
                <mat-card-content>
                    <div  class="flex column center p-2">
                        <p class="mat-body1 mb-4">Welcome to {{title}}. Please click below to login.</p>
                    </div>
                </mat-card-content>
            </mat-card>

            <button mat-flat-button class="mt-4" color="accent" routerLink="/dashboard">Sign In with Azure <mat-icon>trending_flat</mat-icon></button>

        </div>
    </div>`
})

export class HomeComponent implements OnInit {
    @Input() title: string = "SSO UI"
    constructor() { }

    ngOnInit() { }
}