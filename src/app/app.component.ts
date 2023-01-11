import { Component, OnInit, OnDestroy } from '@angular/core';
import { MsalBroadcastService } from "@azure/msal-angular";
import { EventMessage, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'hs-root',
  template: `<div class="hs-root">
      <router-outlet></router-outlet>   
  </div>`
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'azure-sso-ui';

  constructor(private _msalSvc: MsalBroadcastService) {}

  ngOnInit(): void {
    this._msalSvc.msalSubject$
    .pipe(
      filter((msg: EventMessage) => msg.eventType == EventType.LOGIN_SUCCESS)
    )
    .subscribe((result) => {
      console.log(result);
      // TODO: fetch user roles and permission
    })
  }

  ngOnDestroy(): void {
  }
}
