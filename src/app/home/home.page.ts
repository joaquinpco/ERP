import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, API } from 'aws-amplify';
import { MenuController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public action : string;

  constructor(
    public router: Router,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
  ) {}

  async ngOnInit()
  {
    try
    {
      this.action = "update";
      await Auth.currentAuthenticatedUser();
    }
    catch(err)
    {
      this.router.navigate(['/login']);
      console.log(err);
    }
  }

  async ionViewWillEnter()
  {
    this.menuCtrl.enable(true, 'main-menu');
    
    //Check if user has custom attr Defined
    this.loadingCtrl.create();

    try
    {

      const user = await Auth.currentAuthenticatedUser();

      const normalizeUser = await API.put('ERP', 'normalizeUser', {
        Username: user.Username
      });
      
      console.log(user);
      console.log(normalizeUser);

      const { normalizeAttributes } = normalizeUser;

      if(!normalizeAttributes.hasOwnProperty('custom:FIRST_NAME'))
      {
        let result = await Auth.updateUserAttributes(user, {
          'custom:FIRST_NAME': 'DEFAULT',
          'custom:LAST_NAME': 'DEFAULT',
          'custom:ROLE': 'DEFAULT'
        });
      }

      this.loadingCtrl.dismiss();
    }
    catch(err)
    {
      console.error(err);
    }
    finally
    {
      this.loadingCtrl.dismiss();
    }
  }

}
