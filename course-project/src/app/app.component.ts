import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Course Project - Recipe App';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDJHoAmHQdsxLAKHSg1P9o4K_goNler7oo",
      authDomain: "ng-recipes-bdc7c.firebaseapp.com",
    })
  }
}
