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

  public today = moment().locale('fr').format("dddd, Do MMMM YYYY");
  public todayDate = moment().locale('fr').format('L');

  public topics: any = [];
  public informations: any = [];
  public informations2: any = [];

  public presents: Observable<any[]>;
  public newDay: boolean = false;

  public nbPresent: number = 0;



  constructor(private db: AngularFireDatabase) { }

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

    this.db.list('/informations').valueChanges().subscribe(item => {
      console.log(item);
      this.informations2 = item;
      console.log(this.informations2[0]);
      this.nbPresent = this.informations2[2];
      //if (this.todayDate != this.informations2[0]) { this.init(); }

    });


  }




  init() {
    this.addPersonToFirebase("0", "-", "-");
    this.addPersonToFirebase("1", "-", "-");
    this.addPersonToFirebase("2", "-", "-");
    this.addPersonToFirebase("3", "-", "-");
    this.addPersonToFirebase("4", "-", "-");
    this.addPersonToFirebase("5", "-", "-");
    this.addPersonToFirebase("6", "-", "-");
    this.addPersonToFirebase("7", "-", "-");
    this.addInformationsToFirebase("0", "3"); // nombre de participants 0
    this.addInformationsToFirebase(this.todayDate, "1"); // date d'aujourd'hui
    this.addTopicToFirebase("aucun n'a été proposé"); // aucun topic
    this.addInformationsToFirebase(0, "3");
  }

  addPersonToFirebase(id, name, pre) {
    let newKey = id;
    let list = this.db.object(`/present/${newKey}`).set({ nom: name, prenom: pre });

    this.db.list('present').push(list);

    if (name != "-") {
      this.nbPresent++;
      this.addInformationsToFirebase(this.nbPresent, "3");
    } else {
      this.nbPresent--;
      this.addInformationsToFirebase(this.nbPresent, "3");
    }

  }


  addTopicToFirebase(topic) {
    let newKey = "2";
    let list = this.db.object(`/informations/${newKey}`).set(topic);

    this.db.list('/informations/${newKey}').push(topic);
  }

  addDateToFirebase(date) {
    let newKey = "1";
    let list = this.db.object(`/informations/${newKey}`).set(date);

    this.db.list('informations').push(list);
  }

  addInformationsToFirebase(data, number) {
    let newKey = number;
    let list = this.db.object(`/informations/${newKey}`).set(data);

    this.db.list('informations').push(list);
  }

  public addTopic(newTopic: string) {
    this.db.list('/topics').push(newTopic);
  }


  //---------------------------FOOTER-------------------------------------------------------------
  year = (new Date()).getFullYear();
  version = "v1.0";
  owner = "rest and share";
  //----------------------------------------------------------------------------------------------



  topicInput = '';
  updateTopic = function() {
    let title = this.topicInput;
    if (title == "") {
      alert("Ce champ est obligatoire");
    } else {
      this.addInformationsToFirebase(title, 2);
      this.addTopic(title);
      this.topicInput = '';
    }
  }




  RegisterUser(e) {
    e.preventDefault();
    let id = e.target.elements[0].value;
    let nom = e.target.elements[1].value;
    let prenom = e.target.elements[2].value;

    if (nom != "" || prenom != "") {
      this.addPersonToFirebase(id, prenom, nom);
      alert(" Félicitation, tu es bel et bien inscrit pour aujourd'hui à 12H30 - étage 0 - salle confulence. Nous comptons sur toi pour être à l'heure. ");
    } else {
      alert(" Oupps, nom et prenom obligatoire. ");
    }
  }



}
