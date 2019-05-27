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


  saveTravelerToDB(traveler: Traveler){
    var addTravelerURL = (BASE_URL + TRAVELERS_URL);

    this.http.post(addTravelerURL, traveler, options)
    .subscribe( 
          response => {
                        if (response.status == 201) {
                          console.log("Traveler Added " + response.status);  
                          var action = "Traveler Added";
                          this.presentToast(response.status.toString(), action );                         
                          console.log(response.json());
                        } else{
                          console.log("Traveler not added");
                          this.presentToast((500).toString(), "Not Added" );                                                   
                        }                        
                      },
         error => {
                        //alert(error.text());
                        this.presentToast((500).toString(), "Not Added" );  
                        console.log(error.text());
        });
  }


  updateTraveler(traveler: Traveler) {
    var urlUpdateTraveler = BASE_URL + TRAVELERS_URL + "/" + traveler._id;

    this.http.put(urlUpdateTraveler, traveler, options)
    .subscribe( 
          response => {
                        console.log("Traveler Updated " + response.status);
                        var action = "Traveler updated";
                        this.presentToast(response.status.toString(), action );
                      },
         error => {
                        alert(error.text());
                        console.log(error.text());
        });
  }  

  deleteTraveler(_id: string) {
    var urlDeleteTraveler = BASE_URL + TRAVELERS_URL + "/" + _id ;
    console.log(urlDeleteTraveler);
    this.http.delete(urlDeleteTraveler, _id)
    .subscribe( 
          response => {
                        console.log("Game Deleted " + response.status);
                        var action = "Game deleted";
                        this.presentToast(response.status.toString(), action );                                                   
                      },
         error => {
                        alert(error.text());
                        console.log(error.text());
        });
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
