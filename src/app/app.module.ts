import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService
} from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { UserApiService } from './services/user.service';

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
          logLevel: LogLevel.Verbose,
          piiLoggingEnabled: false
        }
      }
    }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      authRequest: {
        scopes: ['user.read'],
      }
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', [environment.azure.clientScope]],
        ['http://localhost:8080/api/*', [environment.azure.clientScope]],
        // [`${environment.base_url}/*`, null]
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
    MsalBroadcastService,
    UserApiService,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
