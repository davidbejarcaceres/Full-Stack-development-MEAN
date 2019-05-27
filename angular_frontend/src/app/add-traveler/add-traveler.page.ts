import { Traveler } from './../models/travelerInterface';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-traveler',
  templateUrl: './add-traveler.page.html',
  styleUrls: ['./add-traveler.page.scss'],
})
export class AddTravelerPage implements OnInit {

  traveler: Traveler;

  constructor(private apiService: APIService, private router: Router) { }

  ngOnInit() {
  }

  addTraveler(form){
    this.traveler = form.value;
    console.log(this.traveler);
    //alert("The form was submitted");
    form.reset();
    this.apiService.saveTravelerToDB(this.traveler);
  }


  
  goHome(){
    console.log("BACK!");
    this.router.navigateByUrl("tabs/tab1")
  }

}


class TravelerClass {
  public trips:     string[];
  public _id:       string;
  public firstname: string;
  public lastname:  string;
  public __v:       number;

  constructor(private id: string, private Trips: string[], private Firstname: string, private Lastname:  string){
    this._id = id;
    this.trips = Trips;
    this.firstname = Firstname;
    this.lastname = Lastname;
    
  }




}