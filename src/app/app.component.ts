import { Component } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private basePath: string = '/topics';
  public topics: any = [];

  public informations: any = [];
  public present: any[] = [];
  //{ name: "abc", email: "heelo" }

  todayDate = moment().locale('fr').format('L');

  constructor(public db: AngularFireDatabase) {
    db.list('/topics').valueChanges().subscribe(data => { this.topics = data; });
    db.list<person>('/present').valueChanges().subscribe(data => {
      this.present = data;

    });
    db.list('/informations').valueChanges().subscribe(data => {
      this.informations = data;
      if (this.informations[0] != this.todayDate) {
        this.addDateToFirebase(this.todayDate);
        this.addTopicToFirebase("aucun n'a été proposé");
        this.addPersonToFirebase("1", "*", "*");
        this.addPersonToFirebase("2", "*", "*");
        this.addPersonToFirebase("3", "*", "*");
        this.addPersonToFirebase("4", "*", "*");
        this.addPersonToFirebase("5", "*", "*");
        this.addPersonToFirebase("6", "*", "*");
        this.addPersonToFirebase("7", "*", "*");
      }
    });

  }

  ngOnInit() { }

  addPersonToFirebase(id, name, pre) {
    let newKey = id;

    let list = this.db.object(`/present/${newKey}`).set({ nom: name, prenom: pre });


    this.db.list('present').push(list);
  }


  addTopicToFirebase(topic) {
    let newKey = "2";
    let list = this.db.object(`/informations/${newKey}`).set(topic);

    this.db.list('informations').push(list);
  }

  addDateToFirebase(date) {
    let newKey = "1";
    let list = this.db.object(`/informations/${newKey}`).set(date);

    this.db.list('informations').push(list);
  }

  /*
    public getList() {
      let topicsTab: any = [];
      this.topicsTab = this.db.list('/topics').valueChanges().subscribe(data => { this.topicsTab = data; });
      console.log(topicsTab);
      return this.topicsTab;
    }
  */

  public addTopic(newTopic: string) {
    this.db.list(this.basePath).push(newTopic);
  }


  //---------------------------FOOTER-------------------------------------------------------------
  year = (new Date()).getFullYear();
  version = "v0.1";
  owner = "rest and share";
  //----------------------------------------------------------------------------------------------

  today = moment().locale('fr').format("dddd, Do MMMM YYYY");




  topicInput = '';

  updateTopic = function() {
    //  e.preventDefault();
    let title = this.topicInput;
    if (title == "") {
      alert("Ce champ est obligatoire");
    } else {
      this.topics.push(title);
      this.addTopic(title);
      this.topicInput = '';
    }



  }


}

export interface members {



}

export interface person {
  nom: string;
  prenom: string;
}
