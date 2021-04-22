import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;
  
  constructor(private afAuth: AngularFireAuth) { 
    this.logInUser();
  }

  ngOnInit() {
  }


  logInUser() {
    this.afAuth.signInAnonymously().then(res =>{
      this.user = res.user;
      console.log(res.user);
    })
  }

}
