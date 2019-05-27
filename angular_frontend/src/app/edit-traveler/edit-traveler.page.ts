import { APIService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Traveler } from '../models/travelerInterface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-traveler',
  templateUrl: './edit-traveler.page.html',
  styleUrls: ['./edit-traveler.page.scss'],
})
export class EditTravelerPage implements OnInit {

  traveler: Traveler;

  constructor(public activatedRoute: ActivatedRoute, private apiService: APIService, private router: Router) {
    this.activatedRoute.params.subscribe(param => {
      this.traveler = <Traveler>param;        
    });
   }

  deleteTraveler(){
    //this.apiService.deleteGame(this.game._id);    
  }

  updateTraveler(form){

    var newGame = new TravelerClass(this.traveler._id, this.traveler.trips, this.traveler.firstname, this.traveler.lastname) 
    console.log("Nuevo Juego como clase editable");
    console.log(newGame);
    
    console.log("Datos del formulario: ");
    console.log(form.value);
  
    console.log("COMPARANDO VALORES NUEVOS");
    
    if (form.value.firstname != null) {
      var newName = <string>form.value.firstname;
      if (newName !== this.traveler.firstname && newName.length > 2) {
        console.log("Cambia nombre");
        newGame.firstname = newName;
        console.log(newGame.firstname);
      }
    }

    if (form.value.lastname != null) {
      var newLastname = <string>form.value.lastname;
      if (newLastname !== this.traveler.lastname && newLastname.length > 2) {
        console.log("Cambia Apellido");
        newGame.lastname = newLastname;
        console.log(newGame.lastname);
      }
    }
    //alert(newGame);
    form.reset();
    //this.apiService.updateGame(newGame);
  }

  ngOnInit() {
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
