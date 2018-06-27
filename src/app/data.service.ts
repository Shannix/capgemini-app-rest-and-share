import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';

//import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private basePath: string = '/topics';
  public topicsTab: FirebaseListObservable<string[]>;


  constructor(public DB: AngularFireDatabase) { }


  /*
    public getList(): Observable<string[]> {
  
      return this.DB.list('/topics').subscribe(data=>{
        console.log(data);
  
      });
    }
  */



}
