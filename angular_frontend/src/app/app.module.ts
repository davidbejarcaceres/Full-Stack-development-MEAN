import { APIService } from './api.service';
import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NavController } from '@ionic/angular';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot() , HttpModule ,AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    HttpModule,
    APIService,
    SplashScreen,
    AppModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(){}


}
