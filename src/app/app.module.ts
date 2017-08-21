import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpModule} from '@angular/http';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {DetailsPage} from '../pages/details/details';
import {MeteoPage} from '../pages/meteo/meteo';
import {OpenweathermapApiService} from '../services/openweathermapapi.service';
import {SQLitePage} from '../pages/sqlite/sqlite';
import {MapsPage} from '../pages/maps/maps';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SQLite} from '@ionic-native/sqlite';
import {GoogleMaps} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';

const cloudSettings : CloudSettings = {
  'core': {
    'app_id': '7e409efd'
  },
  'push': {
    'sender_id': '265179544171',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailsPage,
    MeteoPage,
    SQLitePage,
    MapsPage
  ],
  imports: [
    HttpModule, BrowserModule, IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailsPage,
    MeteoPage,
    SQLitePage,
    MapsPage
  ],
  providers: [
    OpenweathermapApiService,
    StatusBar,
    SplashScreen,
    SQLite,
    GoogleMaps,
    Geolocation, {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}