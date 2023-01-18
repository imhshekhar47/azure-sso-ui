import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AppMaterialModule } from "./app-material.module";
import { HomeComponent } from "./home.component";
import { NavigationControlComponent, SideMenuControlComponent } from './components/controls';

import {
    FieldValueComponent,
    MainComponent, 
    PageComponent,
} from "./components";

import { DashboardComponent } from "./components/dashboard";

import { 
    UserComponent, 
    UserProfileComponent, 
    UserAccessComponent,
} from "./components/user";

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', redirectTo: 'app', pathMatch: 'full' },
    {
        path: 'app', component: MainComponent, canActivate: [MsalGuard], children: [
            { path: '', redirectTo: "dashboard", pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, children: []},
            {
                path: 'user', component: UserComponent, children: [
                    { path: '', redirectTo: "profile", pathMatch: "full"},
                    { path: "profile", component: UserProfileComponent},
                ]
            }
        ]
    },
];

@NgModule({
    declarations: [
        SideMenuControlComponent,
        NavigationControlComponent,
        HomeComponent,
        FieldValueComponent,
        PageComponent,
        MainComponent,

        DashboardComponent,

        UserComponent,
        UserAccessComponent,
        UserProfileComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppMaterialModule,
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
    providers: [],
})
export class AppRoutingModule { }
