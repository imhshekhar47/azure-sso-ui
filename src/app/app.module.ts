import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MsalModule,
  MsalInterceptor,
  MsalGuard,
  MsalService,
  MsalBroadcastService,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot(new PublicClientApplication({ // MSAL Configuration
      auth: {
        clientId: `${environment.azure.clientId}`,
        authority: `${environment.azure.issuerUrl}/${environment.azure.tenantId}`,
        redirectUri: `${environment.base_url}/dashboard`,
        postLogoutRedirectUri: `${environment.base_url}/home`
      },
      cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: true, // set to true for IE 11
      },
      system: {
        loggerOptions: {
          loggerCallback: (loglevel: LogLevel, message: String) => {
            console.log(message);
          },
          logLevel: LogLevel.Info,
          piiLoggingEnabled: false
        }
      }
    }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']],
        //['https://api.backend.com/users/*', ['user.read']],
        [`${environment.base_url}/*`, null]
      ])
    }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
