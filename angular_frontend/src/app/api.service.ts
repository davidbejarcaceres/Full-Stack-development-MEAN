import { Trip } from './models/tripInterface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'; 
import { Observable } from 'rxjs';
import { map, retry, timeInterval, timeout, delay, take, retryWhen } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Traveler } from './models/travelerInterface';
import { TripClass } from './models/TripClass';
import { Url } from 'url';

/**
 * @author David Béjar Cáceres
 * 2019 dbc770@inlumine.ual.es
 */

const BASE_URL = 'http://localhost:3000/api/';

const TRIPS_URL = 'trips';
const TRAVELERS_URL = 'travelers';
var URL_BULK_IMAGES: string = 'http://localhost:3000/api/images';




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
    var url = BASE_URL + TRIPS_URL;
      return this.http.get(url, options).pipe(map((res: Response) => {
      console.log("HTTP Code: " + res.status);
      var action = "Got Trips From Server";
      var trips =  <Trip[]>res.json();
      //this.presentToast(res.status.toString(), action);
      return trips;
    }));
  }

  public getTripsFromTraveler(idTraveler: string): Observable<Trip[]>{
    var url = (`http://localhost:3000/api/travelers/${idTraveler}/trips`);
    
      return this.http.get(url, options).pipe(map((res: Response) => {
      console.log("HTTP Code: " + res.status);
      var action = "Got Trips From Server";
      var trips =  <Trip[]>res.json();
      //this.presentToast(res.status.toString(), action);
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

  public getTravelersImagesList(idTraveler: string): Observable<[]>{
      var url = `http://localhost:3000/api/travelers/${idTraveler}/images/url`
      return this.http.get(url, options).pipe(map((res: Response) => {
      var action = "Got Travelers From Server";
      var urlURLs =  <[]>res.json();
      this.presentToast(res.status.toString(), action);
      return urlURLs;
    }));
  }

  public getTravelersImagesNames(idTraveler: string): Observable<[]>{
    var url = (`http://localhost:3000/api/travelers/${idTraveler}/images/names`);
    console.log("GETTING IMAGES NAMES WITH PATH:");
    console.log(url);
    return this.http.get(url, options).pipe(map((res: Response) => {
    var action = "Got Images From Server";
    var imagesNames =  <[]>res.json();
    this.presentToast(res.status.toString(), action);
    return imagesNames;
  }));
}

public getTravelersImagesResources(idTraveler: string): Observable<string[]>{
  var url = (`http://localhost:3000/api/travelers/${idTraveler}/images/names`);
  return this.http.get(url, options).pipe(map((res: Response) => {
  var respuesta =  <[]>res.json();
  var Imagesresoruces: string[];
  respuesta.forEach(name => {
    var url = (`http://localhost:3000/api/travelers/${idTraveler}/images/${name}`);
    Imagesresoruces.push(url);        
  });
  return Imagesresoruces;
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


  saveTripToDB(trip: TripClass, idTraveler: string){
    var urlTravelerAddsTrip = (BASE_URL + TRAVELERS_URL + "/" + idTraveler + "/trips");

    this.http.post(urlTravelerAddsTrip, trip, options)
    .subscribe( 
          response => {
                        if (response.status == 201) {
                          console.log("Tripp added to traveler´s log" + response.status);  
                          var action = "Trip Added";
                          this.presentToast(response.status.toString(), action );                         
                          console.log(response.json());
                        } else{
                          console.log("Trip not added");
                          this.presentToast((response.status).toString(), "Not Added" );                                                   
                        }                        
                      },
         error => {
                        this.presentToast((500).toString(), "Not Added" );  
                        console.log(error.text());
        });
  }


  updateTraveler(traveler: Traveler) {
    var urlUpdateTraveler = BASE_URL + TRAVELERS_URL + "/" + traveler._id;
    console.log(urlUpdateTraveler);
    
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

  updateTrip(trip: TripClass) {
    var urlUpdateTrip = BASE_URL + TRIPS_URL + "/" + trip.id;
    var url = `http://localhost:3000/api//travelers/5ce96fa9cc91d93b884385b9/trips/5ced394ef03be409a83d56e4`
    console.log(urlUpdateTrip);
    this.http.put(urlUpdateTrip, trip, options)
    .subscribe( 
          response => {
                        console.log("Trip Updated " + response.status);
                        var action = "Trip updated";
                        this.presentToast(response.status.toString(), action );
                      },
         error => {
                        this.presentToast((500).toString(), "Not Added" );  
                        console.log(error.text());
        });
  }

  updateTripByTraveler(trip: TripClass, idTraveler: string) {
    var url = `http://localhost:3000/api/travelers/${idTraveler}/trips/${trip.id}`
    console.log(url);
    this.http.put(url, trip, options)
    .subscribe( 
          response => {
                        console.log("Trip Updated " + response.status);
                        var action = "Trip updated";
                        this.presentToast(response.status.toString(), action );
                      },
         error => {
                        
                        this.presentToast((500).toString(), "Not Added" );  
                        console.log(error.text());
        });
  }
  
  

  deleteTraveler(_id: string) {
    var urlDeleteTraveler = BASE_URL + TRAVELERS_URL + "/" + _id ;
    console.log(urlDeleteTraveler);
    this.http.delete(urlDeleteTraveler, _id)
    .subscribe( 
          response => {
                        console.log("Traveler Deleted " + response.status);
                        var action = "Traveler deleted";
                        this.presentToast(response.status.toString(), action );                                                   
                      },
         error => {
                        this.presentToast((500).toString(), "Not Added" );  
                        console.log(error.text());
        });
  }


  deleteTrip( idTraveler: string ,_idTrip: string) {
    var url = (`http://localhost:3000/api/travelers/${idTraveler}/trips/${_idTrip}`);

    console.log(url);
    
    this.http.delete(url, options)
    .subscribe( 
          response => {
                        console.log("Trip Deleted " + response.status);
                        var action = "Trip deleted";
                        this.presentToast(response.status.toString(), action );                                                   
                      },
         error => {
                        
                        this.presentToast((500).toString(), "Not Added" );  
                        console.log(error.text());
        });
  }

  travelerPostImage(uploadData: FormData, idTraveler: string){
    var urlTravelerImages: string = `http://localhost:3000/api/trips/${idTraveler}/images`;
    this.http.post(urlTravelerImages, uploadData)
    .subscribe( response => {
                              if (response.status == 200) {
                                  console.log("Image Added " + response.status);
                                  var action = "Image Added";
                                  this.presentToast(response.status.toString(), action ); 
                              } else {
                                  console.log("Error Uploading " + response.status);
                                  var action = "Error Uploading";
                                  this.presentToast(response.status.toString(), action);
                              }
                                                                                
                        },
                    error => {                          
                              this.presentToast((500).toString(), "Not Added" );  
                              console.log(error.text());
                    });
}

deleteImage(urlLista: string){
  var urlImage: string = `http://localhost:3000/api/images`;
  this.http.put(urlImage, { img: urlLista}, options)
    .subscribe( 
          response => {
                        console.log("Image Deleted " + response.status);
                        var action = "Image deleted";
                        this.presentToast(response.status.toString(), action );                                                   
                      },
         error => {                        
                        console.log(error.text());
        });
}

travelerPostTripImage(uploadData: FormData, idTraveler: string, idTrip: string){
  var urlTravelerTripImages: string = `http://localhost:3000/api/trips/${idTraveler}/images/${idTrip}`;
  this.http.post(urlTravelerTripImages, uploadData)
  .subscribe( response => {
                            if (response.status == 200) {
                                console.log("Image Added " + response.status);
                                var action = "Image Added";
                                this.presentToast(response.status.toString(), action ); 
                            } else {
                                console.log("Error Uploading " + response.status);
                                var action = "Error Uploading";
                                this.presentToast(response.status.toString(), action);
                            }
                                                                              
                      },
                  error => {                          
                            this.presentToast((500).toString(), "Not Added" );  
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
