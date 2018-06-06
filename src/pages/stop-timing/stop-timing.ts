import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-stop-timing',
  templateUrl: 'stop-timing.html',
})

export class StopTimingPage {

  elapsedTime: number = 0;
  hours: number;
  minutes: number;
  seconds: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.elapsedTime = this.navParams.get('elapsedTime');
    this.minutes = Math.floor(this.elapsedTime/60);
    this.hours = Math.floor(this.minutes/60);
    this.seconds = Math.floor(this.elapsedTime%60);
  }

  submitTime() {
    console.log("this.hours"+this.hours);
    console.log("this.minutes"+this.minutes);
    console.log("this.seconds"+this.seconds);
    let modifiedSeconds = (this.hours * 60 * 60) + (this.minutes * 60) + (this.seconds * 1);
    console.log("modifiedSeconds"+modifiedSeconds);
    this.viewCtrl.dismiss(modifiedSeconds);
  }

}
