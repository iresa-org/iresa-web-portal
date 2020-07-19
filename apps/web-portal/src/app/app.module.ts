import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpotifyModule } from '@iresa/ngx-spotify';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { WindowRef } from '@iresa/shared/utilities';
import { NgxImagelyModule } from '@iresa/ngx-imagely';
import { DashboardDataModule } from '@iresa/web-portal-data';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardDataModule,
    NgxSpotifyModule.forRoot({
      clientId: environment.spotifyConfig.clientId,
      redirectUri: environment.spotifyConfig.redirectUri
    }),
    StoreModule.forRoot([], {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 25,
          logOnly: environment.production
        })
      : [],
    EffectsModule.forRoot([]),
    NgxImagelyModule.forRoot()
  ],
  providers: [WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule {}
