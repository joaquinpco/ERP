import { Attribute, Component, OnInit } from '@angular/core';
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

  ngOnInit() {}

  async ionViewWillEnter()
  {
    this.menuCtrl.enable(true, 'main-menu');
    
    const loading = await this.loadingCtrl.create({
      message: 'Retrieving info. Please, wait...'
    });

    await loading.present();

    try
    {
      const user = await Auth.currentAuthenticatedUser();

      let params = {
        'queryStringParameters' :
        {
          'Username' : user.username
        }
      };

      const ress = await API.put('ERP', '/erp/normalizeUser', params);

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
