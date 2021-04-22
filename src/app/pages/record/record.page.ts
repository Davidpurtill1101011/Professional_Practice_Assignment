import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { from, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// google is declared here so it wo
// it wont cause strange errors in typescript
declare var google: any;
@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {
  // vaiables used to track and show the map
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  map: any;
  currentMapTrack = null;
 
  isTracking = false;
  trackedRoute = [];
  previousRoutes = [];
  user = null;
  watch = null;
  
  locations: Observable<any>;
  locationsCollection: AngularFirestoreCollection<any>;
  positionSubscription: Subscription;

  //private geolocation: Geolocation,
  constructor( private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.anonLogin();
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.showMap();
  }

  showMap() {
    // this is the options that you can make to your
    // liking for the maps you want to use
    const options = {
      zoom: 15,
      disableDefaultUI: true,
      mapTypeId: google.maps.Map.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    }
    // this diplays the map
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    //this gets the current location of the user.
    Geolocation.getCurrentPosition().then(pos => {
      let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      this.map.setCenter(latLng);
      this.map.setZoom(15);
    });
  }

  anonLogin(){
    this.afAuth.signInAnonymously().then(res =>{
      this.user = res.user;
      console.log(res);
      this.locationsCollection = this.afs.collection(
        `locations/${this.user.uid}/track`,
        ref => ref.orderBy('timestamp')
      );
    })
  }


  interval;
  time = new Date(null);

  startTimer() {
    this.interval = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1);
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer() {
    this.time.setSeconds(0);
  }
  // this starts the tracking of your walk/run/bikeride
  startTracking() {
    this.isTracking = true;
    this.watch = Geolocation.watchPosition({}, (position, err) => {
      console.log('New Position: ', position);
      if (position) {
        this.addNewLoc(
          position.coords.latitude,
          position.coords.longitude,
          position.timestamp
        );
      }
    })
  }
  // method to draw a path of where you have been.
  drawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }
    // if statement to draw the lines on the map as it tracks your route.
    if (path.length > 1) {
      this.currentMapTrack = new google.maps.PolyLine({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });

      this.currentMapTrack.setMap(this.map);
    }
  }

  //this function stops the tracking
  stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.previousRoutes.push(newRoute);

    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    this.currentMapTrack.setMap(null);
  }
  //shows the history of your routes.
  showHistoryRoute(route) {
    this.drawPath(route);
  }

  addNewLoc(lat, lng, timestamp) {
    this.locationsCollection.add({
      lat, lng, timestamp
    })
  }

  deleteLoc(pos) {
    this.locationsCollection.doc(pos.id).delete();
  }

}


/* JObs to be done yet
  1). Get the time and distance to show up in the db
  2). Post and get from firebase and then add it to the feedpage.
  3). Just get some data to work on the app for the presintation. */
