import { Http } from '@angular/http';
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

  selectedFile: File

  constructor(public activatedRoute: ActivatedRoute, private apiService: APIService, private router: Router, private http: Http) {
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

  postImage(image){
    console.log(image);

    console.log("VALUE:");
    console.log(image.value);
    var imagen = <File>image.value;
    console.log(imagen);
    
  }

  onFileChanged(event) {
    console.log("CAHNGES FILE:");
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    
  }

  onUpload(){
    console.log("uploading");
    
  }

  postFoto(form){
    console.log(form);
    console.log(form.value);
    
    
  }


  ngOnInit() {
  }

  goHome(){
    console.log("BACK!");
    this.router.navigateByUrl("tabs/tab2")
  }

}

