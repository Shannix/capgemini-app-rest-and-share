import { Component } from '@angular/core';
import * as moment from 'moment';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  private basePath: string = '/topics';
  public topics: any = [];
  public informations: any = [];

  public presents: Observable<any[]>;
  public newDay: boolean = false;

  todayDate = moment().locale('fr').format('L');

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit() {

    this.informations = this.db.list('/informations').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, value: c.payload.val() }));
    });

    this.topics = this.db.list('/topics').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, value: c.payload.val() }));
    });


    this.presents = this.db.list('/present').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, data: c.payload.val(), ...c.payload.val() }));
    });

    console.log("test" + this.presents);
    console.log("topics" + this.topics);

  }




  init() {
    this.addDateToFirebase(this.todayDate);
    this.addTopicToFirebase("aucun n'a été proposé");
    this.addPersonToFirebase("0", "-", "-");
    this.addPersonToFirebase("1", "-", "-");
    this.addPersonToFirebase("2", "-", "-");
    this.addPersonToFirebase("3", "-", "-");
    this.addPersonToFirebase("4", "-", "-");
    this.addPersonToFirebase("5", "-", "-");
    this.addPersonToFirebase("6", "-", "-");
    this.addPersonToFirebase("7", "-", "-");
  }

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
      this.addTopicToFirebase(title);
      //this.topics.push(title);
      this.addTopic(title);
      this.topicInput = '';
    }



  }




  RegisterUser(e) {

    e.preventDefault();
    let id = e.target.elements[0].value;
    let nom = e.target.elements[1].value;
    let prenom = e.target.elements[2].value;

    this.addPersonToFirebase(id, prenom, nom);
    alert("Félicitation, tu es bien inscrit pour aujourd'hui à 12H30 - étage 0 - salle confulence. Nous comptant sur toi pour être à l'heure. ");
  }



}


export interface person {
  nom: string;
  prenom: string;
}
