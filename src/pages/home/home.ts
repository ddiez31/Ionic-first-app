import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { SpeechRecognition } from '@ionic-native/speech-recognition';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  nom: string;
  prenom: string;
  age: number;

  isSpeechAvailable = false;
  isListening = false;
  matches: Array<string> = [];

  constructor(public navCtrl: NavController, private changeDetectorRef: ChangeDetectorRef, private platform: Platform, private speechRecognition: SpeechRecognition) {
    platform.ready().then(() => {
      // Check feature available
      this.speechRecognition.isRecognitionAvailable()
        .then((available: boolean) => this.isSpeechAvailable = available)
    })
  }

  // Start the recognition process
  public startListening(): void {

    this.isListening = true;
    this.matches = [];
    let options = {
      language: 'fr-FR',
      matches: 5,
      prompt: 'Je vous écoute',      // Android only
      showPopup: true,  // Android only
      showPartial: false // iOS only
    }
    this.speechRecognition.startListening(options)
      .subscribe(
      (matches: Array<string>) => {
        this.isListening = false;
        this.matches = matches;
        this.changeDetectorRef.detectChanges();
      },
      (onerror) => {
        this.isListening = false;
        this.changeDetectorRef.detectChanges();

      }
      )
  }

  // Stop the recognition process (iOS only)
  public stopListening(): void {
    this.speechRecognition.stopListening();
  }

  private showDetails() {
    this.navCtrl.push(DetailsPage, {
      nom: this.nom,
      prenom: this.prenom,
      age: this.age
    });
  }

}
