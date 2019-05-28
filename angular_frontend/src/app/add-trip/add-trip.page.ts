import { Component, OnInit } from '@angular/core';
import { Trip } from '../models/tripInterface';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../api.service';
import { TripClass } from '../models/TripClass';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.page.html',
  styleUrls: ['./add-trip.page.scss'],
})
export class AddTripPage implements OnInit {

  trip: Trip;
  idTraveler: string;
  url : string = "http://www.google.com/search?q=";
  playerName: string;

  constructor(public activatedRoute: ActivatedRoute, private apiService: APIService, private router: Router) {
    this.activatedRoute.params.subscribe(param => {
      this.idTraveler = param.id;      
    });
   }

  
  
  addTrip(form){
    var formValues: TripClass = form.value;
    console.log("Object to been sent");
    console.log(formValues);
    form.reset();
    this.apiService.saveTripToDB(formValues, this.idTraveler);
    //this.goHome();
    
  }


  ngOnInit() {
  }

  goHome(){
    console.log("BACK!");
    this.router.navigateByUrl("tabs/tab2")
  }

}

