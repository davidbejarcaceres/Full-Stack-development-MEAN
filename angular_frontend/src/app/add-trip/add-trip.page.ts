import { Http, RequestOptions, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Trip } from '../models/tripInterface';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../api.service';
import { TripClass } from '../models/TripClass';

var headers = new Headers({ 'Content-Type': 'undefined' });
var options = new RequestOptions({headers: headers});

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.page.html',
  styleUrls: ['./add-trip.page.scss'],
})
export class AddTripPage implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

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

  onFileChanged(event) {
    console.log("CAHNGES FILE:");
    //Gets the file from the form when file changes has been detected
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    
  }

  onUpload(){
    console.log("uploading");
    const uploadData = new FormData();
    uploadData.append('userFile', this.selectedFile, this.selectedFile.name);
    this.apiService.travelerPostImage(uploadData, this.idTraveler);
  }

  goHome(){
    console.log("BACK!");
    this.router.navigateByUrl("tabs/tab2")
  }

}

