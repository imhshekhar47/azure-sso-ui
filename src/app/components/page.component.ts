import { Component, OnInit, Input } from '@angular/core';
import { AppLink } from '../types';

@Component({
    selector: 'hs-page',
    template: `<div class="hs-page">
        <mat-toolbar>{{ title }}</mat-toolbar>
        <div class="flex row">
            <div class="flex column menu-col">
                <mat-list role="list" class="menu">
                    <mat-list-item role="listitem" *ngFor="let link of links">
                        <button mat-button class="list-button" [routerLink]="link.path">
                            <mat-icon>arrow_right</mat-icon> {{ link.label }} 
                        </button>
                    </mat-list-item>
                </mat-list>
            </div>
            <div class="flex auto center">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>`,
    styles: [`
    .hs-page {
            margin: 0px;
    }

    .menu-col {
        padding-right: 8px;
    }

    .menu {
        min-width: 170px;
    }

    .menu>.mdc-list-item {
        padding: 0px;
    } 

    .list-button {
       width: 100%;
       padding-left: 20px;
       justify-content: left;
       font-weight: 400;
    }

    `]
})
export class PageComponent implements OnInit {
    @Input() title!: string;
    @Input() links!: Array<AppLink>
    constructor() { }

    ngOnInit() { }
}