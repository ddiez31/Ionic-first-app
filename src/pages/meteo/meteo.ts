import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OpenweathermapApiGlobal } from '../../models/openweathermapapi-global.model';
import { OpenweathermapApiService } from '../../services/openweathermapapi.service';

@Component({
  selector: 'page-meteo',
  templateUrl: 'meteo.html'
})

export class MeteoPage {

  meteo: OpenweathermapApiGlobal = new OpenweathermapApiGlobal();

  constructor(public navCtrl: NavController, private openweathermapApiService: OpenweathermapApiService) {
    this.getWeather(null);
  }

  public getWeather(refresher) {
    this.openweathermapApiService.getWeather()
      .then(meteoFetched => {
        this.meteo = meteoFetched;
        (refresher) ? refresher.complete() : null;
        console.log('Données récupérées depuis le serveur !');
        // console.log(this.meteo.weather[0].main);
        // console.log(this.meteo.wind['speed']);
        console.log(this.meteo);
      });
  }
}
