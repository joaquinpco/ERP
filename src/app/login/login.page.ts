import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, LoadingController, MenuController } from '@ionic/angular';

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
        public router: Router,
        public menuCtrl: MenuController
    )
    {
        this.loginProps = new LoginProps();
    }

    async ngOnInit() {
      try
      {
        await Auth.currentAuthenticatedUser();
        this.router.navigate(['/home']);
      }
      catch(err)
      {
        console.log(err);
      }
    }

    ionViewWillEnter()
    {
      this.menuCtrl.enable(false, 'main-menu');
    }

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

            if(user.challengeName === undefined)
            {
              this.router.navigate(['/home']);
            }
            else
            {
              if(user.challengeName === "NEW_PASSWORD_REQUIRED")
              {
                console.log("Setear contraseña");
                const u = await Auth.completeNewPassword(user, details.password, user.challengeParam.requiredAttributes);
                this.router.navigate(["/home"]);
              }
            }     
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
