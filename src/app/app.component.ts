import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
  	this.loadedFeature = feature;
  }

  ngOnInit() {
  	firebase.initializeApp({
  		apiKey: "AIzaSyBejUj807pupsIJv-9DESmcW5l1E7aTaw4",
		authDomain: "recipebook-57ef9.firebaseapp.com",
  	});
  }
}
