import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from "./home.component";
import { NavigationControlComponent, SideMenuControlComponent } from './components/controls';

import { 
    MainComponent, 
} from "./components";
import { AppMaterialModule } from "./app-material.module";

export const appRoutes: Routes = [
]

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'dashboard', redirectTo: 'app', pathMatch: 'full'},
    { path: 'app', component: MainComponent, canActivate: [ MsalGuard ], children: appRoutes },
    
];

@NgModule({
    declarations:[
        SideMenuControlComponent,
        NavigationControlComponent,
        HomeComponent,
        MainComponent,
    ],
    imports: [
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
