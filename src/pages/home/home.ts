import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Flashlight } from '@ionic-native/flashlight';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private isOn: boolean = false;

  constructor(public toastCtrl: ToastController, public flashlight: Flashlight) {  }

  async isAvailable(): Promise<boolean> {
    try {
      return await this.flashlight.available();
    }
    catch (e) {
      this.showToast(e);
    }
  }

  async toggleFlash(): Promise<void> {
    try {
      let available = await this.isAvailable();
      if (available) {
        await this.flashlight.toggle;
        this.isOn = !this.isOn;
      } else {
        this.showToast("Flashlight isn't available.")
      }
    }
    catch (e) {
      this.showToast(e);
    }
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
