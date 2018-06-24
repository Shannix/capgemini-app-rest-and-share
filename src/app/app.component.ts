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




}
