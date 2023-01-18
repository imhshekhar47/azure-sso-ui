import { Component, OnInit, OnDestroy } from '@angular/core';
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { AuthenticationResult, EventMessage, EventType, SilentRequest } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { RoleApiService } from './services/roles-api';
import { UserApiService } from './services/user.service';
import { AppUser, UndefinedUser } from './types';

@Component({
  selector: 'hs-root',
  template: `<div class="hs-root">
      <router-outlet></router-outlet>   
  </div>`,
  providers: [UserApiService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'azure-sso-ui';

  constructor(
    private _userSvc: UserApiService,
    private _msalSvc: MsalService) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
  }
}
