import { Component, OnInit } from '@angular/core';
import { delay } from 'q';
import { Trip } from '../models/tripInterface';
import { APIService } from '../api.service';
import { Traveler } from '../models/travelerInterface';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {

  
  trips: Trip[];


  constructor(private apiService: APIService) {

   }

  getTrips(){
    var trips = this.apiService.getTrips().subscribe(async data => {
      await delay(1500);

      console.log(<Trip[]>data);
      this.trips = <Trip[]>data;
    })
  }

ngOnInit(): void {
  this.getTrips();
}

}
