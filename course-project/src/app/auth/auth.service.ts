import * as firebase from 'firebase';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {
    // get token from local storage.
    const fbIndexes = Object.keys(window.localStorage).filter((item) => item.indexOf('firebase') != -1);
    if (fbIndexes.length > 0) {
      const fbObj = window.localStorage.getItem(fbIndexes[0]);
      this.token = JSON.parse(fbObj).stsTokenManager.accessToken;
    }
  }

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
      error => console.log(error)
      );
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
      response => {
        this.router.navigate(['/'])
        firebase.auth().currentUser.getToken()
          .then((token: string) => {
            this.token = token;
          });
      }).catch(error => console.log(error))
  }

  signOut() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then((token: string) => {
        this.token = token;
      });

    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}