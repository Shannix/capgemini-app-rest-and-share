import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCeeLRPi_bSSouxqODE-VdvxUUQaiixtbo",
  authDomain: "ionic-project-4327c.firebaseapp.com",
  databaseURL: "https://ionic-project-4327c.firebaseio.com",
  projectId: "ionic-project-4327c",
  storageBucket: "ionic-project-4327c.appspot.com",
  messagingSenderId: "741641947952"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    FormsModule,
    BrowserModule,
    AngularFireDatabaseModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
