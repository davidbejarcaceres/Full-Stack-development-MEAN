import { APIService } from './../api.service';
import { Component } from '@angular/core';
import { Trip } from '../models/tripInterface';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private apiService: APIService) {
  
  }

  getTrips(){
    var datos = this.apiService.getTrips().subscribe(async data => {
      console.log(<Trip[]>data);
  })
    

  }

}
