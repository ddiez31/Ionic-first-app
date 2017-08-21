import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import { TabsPage } from '../pages/tabs/tabs';

@Component({ templateUrl: 'app.html' })
export class MyApp {
  rootPage: any = TabsPage;

  constructor(private speechRecognition: SpeechRecognition, private oneSignal: OneSignal, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available. Here you can do
      // any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.oneSignal.startInit('126ce4b9-398a-4eb5-903e-86f015e6ae8c', '1008449955330');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });
      this.oneSignal.endInit();
      // Check permission
      this.speechRecognition.hasPermission()
        .then((hasPermission: boolean) => {
          console.log('Droit d\'utiliser la reconnaissance vocale? : ' + hasPermission);
          if (!hasPermission) {
            this.requestSpeechRecognitionPermission();
          }
        })
    });
  }
  private requestSpeechRecognitionPermission(): void {
    // Request permissions
    this.speechRecognition.requestPermission()
      .then(
      () => console.log('Permission accordée'),
      () => console.log('Permission refusée')
      )

  }
}
