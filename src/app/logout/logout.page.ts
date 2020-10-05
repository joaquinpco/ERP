import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(

    public alertController: AlertController,
    public router: Router

    ) { }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.presentAlertConfirm();
  }

  async signout() {
    try{  
      await Auth.signOut({ global: true });
      this.router.navigate(['/login']);
    }
    catch(err) {
      console.log("Error signing out: " + err);
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Do you want to sign out of ERP?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigate(['/home']);
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.signout();
          }
        }
      ]
    });

    await alert.present();
  }

}
