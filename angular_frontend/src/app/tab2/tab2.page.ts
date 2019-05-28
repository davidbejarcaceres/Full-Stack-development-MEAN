import { Component, NgZone } from '@angular/core';
import { Trip } from '../models/tripInterface';
import { APIService } from '../api.service';
import { delay } from 'q';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  trips: Trip[];
  idTraveler: string;
  url : string = "http://www.google.com/search?q=";
  urlImages: [];
  urlimagesNames: [];

  lista: string[] = [
  ];

  constructor(private apiService: APIService, private _ngZone: NgZone, private router: Router, private navControler: NavController) {
    // TODO: Remplace with the ID of the player from the DB, for production would be needed to have login screen
    this.idTraveler = "5ce96fa9cc91d93b884385b9"
   }

   onClickTrip(trip: Trip){
    console.log(trip._id);    
   }

   onClickCity(city : string){
    console.log(city);
    var URL_SEARCH = this.url + city + "+" + "city"; 
    window.open(URL_SEARCH, "_system");
   }

   onClickCountry(country : string){
    console.log(country);
    var URL_SEARCH = this.url + country + "+" + "country"; 
    window.open(URL_SEARCH, "_system");
   }

  getTrips(){
    this.apiService.getTrips().subscribe(async data => {
      await delay(1500);
      console.log(<Trip[]>data);
      this.trips = <Trip[]>data;
    })
  }

  getTripsFromTraveler(){
    var trips = this.apiService.getTripsFromTraveler(this.idTraveler).subscribe(async data => {
      await delay(1500);
      console.log(<Trip[]>data);
      this.trips = <Trip[]>data;
    })
  }

  goToEdit(tripParam){
    var paramTrip =JSON.stringify(tripParam);
    this.navControler.navigateForward(["tabs/tab2/edit-trip", { id: this.idTraveler , trip: paramTrip} ]);
  }

  goToAddTrip(){
    this.navControler.navigateForward(["tabs/tab2/add-trip", { id: this.idTraveler}]);
  }

  getImagesUrls(){
    this.apiService.getTravelersImagesList(this.idTraveler).subscribe(async data => {
      await delay(1500);
      this.urlImages = data;
      console.log(this.urlImages);
      this.urlImages.forEach(url => {
        console.log(url);              
      });
      var url = `http://localhost:3000/api/travelers/${this.idTraveler}/images/names`;
    })
  }

  getImagesNames(){
    this.apiService.getTravelersImagesNames(this.idTraveler).subscribe(async data => {
      await delay(1500);
      this.urlimagesNames = data;
      console.log(this.urlimagesNames);
      this.urlimagesNames.forEach(name => {
        var url = (`http://localhost:3000/api/travelers/${this.idTraveler}/images/${name}`);
        this.lista.push(url);        
      });
    })
  }

  getResources(){
    this.apiService.getTravelersImagesResources(this.idTraveler).subscribe(async recursos => {
      var recursosLista = recursos;
      console.log(recursos);      
      console.log("PRINTING LIST OF RESOURCES:");
      console.log(recursosLista);
      recursosLista.forEach(recurso => {
        console.log(recurso);
      });
    })
  }


ngOnInit(): void {
  this.getImagesNames();
  this.getResources();
}

ionViewWillEnter() {
  this.getTripsFromTraveler()
  //this.getImagesUrls();
}

}
