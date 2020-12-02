import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
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
        public menuController: MenuController,
        private renderer: Renderer2,
        private storage: Storage
    )
    {
        this.loginProps = new LoginProps();
        
        //Change current Theme Settings
        this.storage.get('toggleCheck').then((result) => {
          if(result)
          {
            this.renderer.setAttribute(document.body, 'color-theme', 'dark');
          }
          else
          {
            this.renderer.setAttribute(document.body, 'color-theme', 'light');
          }
        });
    }

    async ngOnInit() {
      try
      {
        await Auth.currentAuthenticatedUser();
        this.router.navigate(['/home']);
      }
      catch(err)
      {
        
      }
    }

    async ionViewWillEnter()
    { 
      await this.menuController.enable(false);
    }

    clearInputs(loginProps: LoginProps)
    {
      loginProps.username = "";
      loginProps.password = "";
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

            if(user.challengeName === undefined)
            {
              this.clearInputs(this.loginProps);
              this.router.navigate(['/home']);
            }
            else
            {
              if(user.challengeName === "NEW_PASSWORD_REQUIRED")
              {
                const u = await Auth.completeNewPassword(user, details.password, user.challengeParam.requiredAttributes);
                this.clearInputs(this.loginProps);
                this.router.navigate(["/home"]);
              }
            }     
        } catch(err)
        {
            const alert = await this.alertCtrl.create({
                header: 'Error',
                subHeader: err.code,
                message: err.message,
                buttons: ['Ok']
            });
            await alert.present();

            this.clearInputs(this.loginProps);
            
        } finally
        {
            await this.loadingCtrl.dismiss();
        }
    }
}
