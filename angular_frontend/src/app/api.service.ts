import { Trip } from './models/tripInterface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'; 
import { Observable } from 'rxjs';
import { map, retry, timeInterval, timeout, delay, take, retryWhen } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Traveler } from './models/travelerInterface';

/**
 * @author David Bejar Caceres
 * 2019 dbc770@inlumine.ual.es
 */

const BASE_URL = 'http://localhost:3000/api/';

const TRIPS_URL = 'trips';
const TRAVELERS_URL = 'travelers';

var headers = new Headers({ 'Content-Type': 'application/json' });
var options = new RequestOptions({ headers: headers,
});

@Injectable({
  providedIn: 'root'
})
export class APIService {
  
  constructor(private http: Http, private toastController: ToastController) {
   

  }


  // The most simpe mehtod to get from API
  public getALLTrips(){ 
    var url = BASE_URL + TRIPS_URL;
    return this.http.get(url).pipe(map(res => res.json()));
  }


  public getTrips(): Observable<Trip[]>{
    console.log("Pidiendo trips");
    var url = BASE_URL + TRIPS_URL;
      return this.http.get(url, options).pipe(map((res: Response) => {
      console.log("HTTP Code: " + res.status);
      var action = "Got Trips From Server";
      var trips =  <Trip[]>res.json();
      this.presentToast(res.status.toString(), action);
      return trips;
    }));
  }

  public getTravelers(): Observable<Traveler[]>{
    console.log("Pidiendo trips");
    var url = BASE_URL + TRAVELERS_URL;
      return this.http.get(url, options).pipe(map((res: Response) => {
      console.log("HTTP Code: " + res.status);
      var action = "Got Travelers From Server";
      var trips =  <Traveler[]>res.json();
      this.presentToast(res.status.toString(), action);
      return trips;
    }));
  }


  async presentToast(code: string, action: string) {
    const toast = await this.toastController.create({
      message: (code + "  -  " + action),
      duration: 1000,
      position: 'bottom',
      mode: "ios"
    });
    toast.present();
  }

}
