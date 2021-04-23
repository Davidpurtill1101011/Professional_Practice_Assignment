import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore ) { }
  
  ngOnInit() {    
  }

  // callback for when login is done and sends the user to the homepage
  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult){
    this.router.navigateByUrl('/home');
  }

}
