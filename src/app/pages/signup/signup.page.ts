import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  Auth: any;

  constructor() { }

  ngOnInit() {
  }

  registerUser(event){
    event.preventDefault();
    const errors = [];
    const target = event.target;
    const username = target.querySelector('#username').value;
    const email = target.querySelector('#email').value;
    const dob = target.querySelector('#dob').value;
    const password = target.querySelector('#password');
    const cpassword = target.querySelector('#cpassword');

    if (password != cpassword){
      errors.push("Passwords do not match");
    }
    
    
  }

}
