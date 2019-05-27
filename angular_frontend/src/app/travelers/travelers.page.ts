import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { Trip } from '../models/tripInterface';
import { delay } from 'q';
import { Traveler } from '../models/travelerInterface';

@Component({
  selector: 'app-travelers',
  templateUrl: './travelers.page.html',
  styleUrls: ['./travelers.page.scss'],
})
export class TravelersPage implements OnInit {

  travelers: Traveler[];


  constructor(private apiService: APIService, private router: Router) {

   }

  getTravelers(){
    var trips = this.apiService.getTravelers().subscribe(async data => {

      await delay(2000);

      console.log(<Traveler[]>data);
      this.travelers = <Traveler[]>data;
    })
  }

  goHome(){
    console.log("BACK!");
    this.router.navigateByUrl("tabs/tab1")
  }

ngOnInit(): void {
  this.getTravelers();
}

}
