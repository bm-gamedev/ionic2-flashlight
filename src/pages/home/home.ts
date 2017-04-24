import { Component } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';
import { Flashlight } from '@ionic-native/flashlight';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private isOn: boolean = false;
  private available: boolean = false;

  constructor(
    private toastCtrl: ToastController,
    private flashlight: Flashlight,
    private dialogs: Dialogs,
    private platform: Platform) {
    this.platform.ready().then(() => {
      this.flashlight.available()
        .then(() => {
          this.available = true;
        }).catch((e) => {
          this.showToast("Flashlight isn't available!");
        })
    })
  }

  toggleFlash() {
    if (this.available) {
      this.flashlight.toggle()
        .then(() => {
          this.isOn = !this.isOn;
        })
        .catch((e) => {
          this.showToast(e);
        })
    } else {
      this.showAlert("Flashlight", "Flashlight isn't available!");
    }
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  showAlert(title: string, msg: string) {
    this.dialogs.alert(msg, title).then(() => { });
  }
}
