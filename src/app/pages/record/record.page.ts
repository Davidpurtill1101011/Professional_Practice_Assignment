import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';

declare var google: any;
@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {
  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef:ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.showMap();
  }

  showMap() {
    const location = new google.maps.LatLng(52.380419542018174, -7.931785583496094);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }

   this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }
  
  interval;
  time = new Date(null);

  startTimer(){
    this.interval = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1);
    }, 1000);
  }

  pauseTimer(){
    clearInterval(this.interval);
  }

  resetTimer(){
    this.time.setSeconds(0);
  }

}
