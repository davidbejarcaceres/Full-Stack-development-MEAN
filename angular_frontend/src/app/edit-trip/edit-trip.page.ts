import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../api.service';
import { Trip } from '../models/tripInterface';
import { TripClass } from '../models/TripClass';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.page.html',
  styleUrls: ['./edit-trip.page.scss'],
})
export class EditTripPage implements OnInit {

  trip: Trip;
  url : string = "http://www.google.com/search?q=";
  idTraveler: string;

  constructor(public activatedRoute: ActivatedRoute, private apiService: APIService, private router: Router, private navControler: NavController) {
    this.activatedRoute.params.subscribe(param => {
      this.trip =  <Trip>JSON.parse(param.trip);
      this.idTraveler = param.id;
    });
   }


  
  
  updateTrip(form){
    var formValues: Trip = form.value;

    var newTrip = new TripClass(this.trip.travelers, this.trip._id, this.trip.country, this.trip.city, this.trip.place, this.trip.year, this.trip.month, this.trip.rating, this.trip.notes);
    console.log("Nuevo Juego como clase editable");
    console.log(newTrip);
    
    console.log("Datos del formulario: ");
    console.log(formValues);
  
    console.log("COMPARANDO VALORES NUEVOS");
    
    if (formValues.country != null) {
      var newCountry = <string>formValues.country;
      if (newCountry !== this.trip.country && newCountry.length > 2) {
        console.log("Cambia pais");
        newTrip.$country = newCountry;
        console.log(newTrip.$country);
      }
    }

    if (formValues.city != null) {
      var newcity = <string>formValues.city;
      if (newcity !== this.trip.city && newcity.length > 2) {
        console.log("Cambia ciudad");
        newTrip.$city = newcity;
        console.log(newTrip.$city);
      }
    }

    if (formValues.place != null) {
      var newplace = <string>formValues.place;
      if (newplace !== this.trip.place && newplace.length > 2) {
        console.log("Cambia lugar");
        newTrip.$place = newplace;
        console.log(newTrip.$place);
      }
    }

    if (form.value.year == "") {
      console.log("Empty year");
    } else {
      if (formValues.year != null || form.value.year) {
        var newyear = <number>formValues.year;
        if (newyear !== this.trip.year) {
          console.log("Cambia año");
          newTrip.$year = newyear;
          console.log(newTrip.$year);
        }
      }
    }

    if (formValues.month != null) {
      var newmonth = <string>formValues.month;
      if (newmonth !== this.trip.month && newmonth.length > 2) {
        console.log("Cambia mes");
        newTrip.$month = newmonth;
        console.log(newTrip.$month);
      }
    }

    if (form.value.rating == "") {
      console.log("Empty Rating");
    } else{
      if (formValues.rating != null || form.value.rating) {
        var newrating = <number>formValues.rating;
        if (newrating !== this.trip.rating) {
          console.log("Cambia rating");
          console.log(newrating);        
          newTrip.$rating = newrating;
        }
      }
    }
    
    if (formValues.notes != null) {
      var newnotes = <string>formValues.notes;
      if (newnotes !== this.trip.notes && newnotes.length > 2) {
        console.log("Cambia notas");
        newTrip.$notes = newnotes;
        console.log(newTrip.$notes);
      }
    }

    console.log("Object to been sent");
    console.log(newTrip);
    //alert(newGame);
    form.reset();
    this.apiService.updateTrip(newTrip);
    //this.goHome();
  }

  deleteTrip(){
    this.apiService.deleteTrip(this.idTraveler ,this.trip._id);
    this.goHome();
  }


  ngOnInit() {
  }

  goHome(){
    console.log("BACK!");
    //this.router.navigateByUrl("tabs/tab2")
    this.navControler.navigateForward(["tabs/tab2"]);
  }

}
