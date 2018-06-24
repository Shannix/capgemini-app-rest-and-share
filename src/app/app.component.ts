import { Component } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {





  //---------------------------FOOTER-------------------------------------------------------------
  year = (new Date()).getFullYear();
  version = "v0.1";
  owner = "rest and share";
  //----------------------------------------------------------------------------------------------

  today = moment().locale('fr').format("dddd, Do MMMM YYYY");

  topics = ["Topic 1", "Topic 2", "Topic 3", "Topic 4"];

  topicInput = '';

  updateTopic = function() {
    //  e.preventDefault();
    let title = this.topicInput;
    if (title == "") {
      alert("Ce champ est obligatoire");
    } else {
      this.topics.push(title);
      this.topicInput = '';

      //  $('#exampleModal').modal('hide');
    }



  }


}
