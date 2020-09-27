import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';

import { Auth } from 'aws-amplify';
export class LoginProps
{
  username: String;
  password: String;
};
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit
{
    public loginProps : LoginProps;

    constructor(
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public router: Router
    )
    {
        this.loginProps = new LoginProps();
    }

    ngOnInit() { }

    async login()
    {
        const loading = await this.loadingCtrl.create({
          message: 'Please wait....'
        });
        await loading.present();

        const details = Object.assign(this.loginProps);
        
        try
        {
            const user = await Auth.signIn(details.username, details.password);
            console.log(user);

            this.router.navigate(['/home']);
        } catch(err)
        {
            console.log(err);
            const alert = await this.alertCtrl.create({
                header: 'Error',
                subHeader: err.code,
                message: err.message,
                buttons: ['Ok']
            });
            await alert.present();
        } finally
        {
            await this.loadingCtrl.dismiss();
        }
    }
}
