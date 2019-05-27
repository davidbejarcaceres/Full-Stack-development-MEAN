import { Component } from '@angular/core';
import { APIService } from '../api.service';
import { Trip } from '../models/tripInterface';
import { delay } from 'q';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  trips: Trip[];


  constructor(private apiService: APIService) {

   }

  getTrips(){
    var trips = this.apiService.getTrips().subscribe(async data => {
      await delay(2000);

      console.log(<Trip[]>data);
      this.trips = <Trip[]>data;
    })
  }

ngOnInit(): void {
  this.getTrips();
}

}
