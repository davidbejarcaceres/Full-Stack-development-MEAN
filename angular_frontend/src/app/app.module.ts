import { APIService } from './api.service';
import { NgModule, ErrorHandler, NgZone } from '@angular/core';
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


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot() , HttpModule ,AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    HttpModule,
    APIService,
    SplashScreen,
    {
      provide: ErrorHandler,
      useClass: AppModule,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule implements ErrorHandler {

  constructor(private NavController: NavController, private zone: NgZone){}

  public handleError(error: Error): void {
    var str = error.message
    var navigationError = str.includes("Error: Cannot match any routes. URL Segment:");    
    if (navigationError) {
      console.log("Error in navigation, redirecting to HomePage");
      this.NavController.navigateRoot("tabs/tab1")
    }
  }

}
