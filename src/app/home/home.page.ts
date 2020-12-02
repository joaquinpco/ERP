import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, API } from 'aws-amplify';
import { LoadingController } from '@ionic/angular';
import { MenuService } from '../services/menu.service';
import { Storage } from '@ionic/storage';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  public action : string;

  constructor(
    public router: Router,
    public menuService: MenuService,
    public loadingCtrl: LoadingController,
    public storage: Storage 
  ) {}

  ngOnInit() {}

  async ionViewWillEnter()
  {
    
    const loading = await this.loadingCtrl.create({
      message: 'Retrieving info. Please, wait...'
    });

    await loading.present();

    try
    {
      //Check if admin use for updating main cognito attrs.
      let user = await Auth.currentAuthenticatedUser();

      let params = {
        'queryStringParameters' :
        {
          'Username' : user.username
        }
      };

      const ress = await API.put('ERP', '/erp/normalizeUser', params);

      //Query for Menu 
      params = {
        'queryStringParameters' :
        {
          'Username' : user.username
        }
      };

      user = await API.get('ERP', '/erp/getNormalizeUser', params);

      await this.storage.set('role', user.normalizeAttr['custom:ROLE']);
      await this.menuService.enableMenu(user.normalizeAttr['custom:ROLE']);
      await this.menuService.close();

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
