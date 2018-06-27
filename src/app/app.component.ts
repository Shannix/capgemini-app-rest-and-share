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

  constructor(public db: AngularFireDatabase) {
    this.topics = db.list('/topics').valueChanges().subscribe(data => { this.topics = data; });
  }

  ngOnInit() { }

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
