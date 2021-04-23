import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }
  locations: Observable<any>;
  locationsCollection: AngularFirestoreCollection<any>;

  ngOnInit() {
  //  this.datafeed();
  this.afAuth.signInAnonymously().then(res => {
    // get the userId from the current user.
    
    this.locationsCollection = this.afs.collection(
      `locations/${res.user.uid}/track`,
      ref => ref.orderBy('timestamp')
    );
      // get the information from the id (lat,long)
    this.locationsCollection.get().subscribe(snapshot => {
      //snapshot.docs.map(doc =>doc.data)
      console.log(snapshot.docs.map(doc => doc.data()));
    });
  })
  }

  datafeed(){
    this.afAuth.signInAnonymously().then(res => {
      // get the userId from the current user.
      
      this.locationsCollection = this.afs.collection(
        `locations/${res.user.uid}/track`,
        ref => ref.orderBy('timestamp')
      );
        // get the information from the id (lat,long)
      this.locationsCollection.get().subscribe(snapshot => {
        //snapshot.docs.map(doc =>doc.data)
        console.log(snapshot.docs.map(doc => doc.data()));
      });

      this.locations = this.locationsCollection.valueChanges();
    })
  }

  deleteLoc(pos) {
    this.locationsCollection.doc(pos.id).delete();
  }
}