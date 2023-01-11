import { Component, OnInit, Input } from '@angular/core';
import { AppLink, AppUser } from 'src/app/types';

@Component({
    selector: 'hs-sidemenu-control',
    template: `<div class="hs-sidmenu-control">
    <mat-list *ngFor="let link of items" role="list">
        <div mat-subheader *ngIf="link.isGroup">{{ link.label }}</div>
        <mat-divider></mat-divider>
        <mat-list-item role="listitem" *ngFor="let child of link.children">
            <button mat-flat-button class="list-button" [routerLink]="child.path">
                <mat-icon>arrow_right</mat-icon> {{ child.label }} 
            </button>
        </mat-list-item>
    </mat-list>
</div>`,
styles:[
    `.list-button {
        width: 100%;
        padding-left: 20px;
        justify-content: left;
        font-weight: 400;
    }`
]
})
export class SideMenuControlComponent implements OnInit {
    @Input() user!: AppUser;
    private _links: Array<AppLink> = [
        { 
            label: 'Main', isGroup: true, hasAuthority: ['role_user'], children: [
                { label: 'Dashboard',       path: '/dashboard',     },
                
            ],
        },
        {
            label:'Admin', isGroup: true, hasAuthority: ['role_admin'], children: [
                { label: 'Customer Type',   path: '/customertype',  },
                { label: 'Customers',       path: '/customer',      },
                { label: 'Accounts',        path: '/account' ,      },
                { label: 'Services',        path: '/service' ,      },
                { label: 'Adjustments',     path: '/adjustment',    },
                { label: 'Invoices',        path: '/invoice',       },
                { label: 'Price Lookup',    path: '/price',         }
            ]
        }
    ]

    constructor() { }

    ngOnInit() { }

    private filterAllowedLinks(links: Array<AppLink>): Array<AppLink> {
        const items = links.filter((link) => {
            let isOk: boolean = true;
            if(link.hasAuthority) {
                isOk = isOk && this.user.hasAuthority(link.hasAuthority)
            }

            if(link.hasAnyAuthority) {
                isOk = isOk && this.user.hasAnyAuthority(link.hasAnyAuthority)   
            }

            return isOk;
        })

        for(let item of items) {
            if(item.children) {
                item.children = this.filterAllowedLinks(item.children)
            }
        }
        
        return items;
    }

    get items(): Array<AppLink> {
        return this.filterAllowedLinks(this._links);
    }

}