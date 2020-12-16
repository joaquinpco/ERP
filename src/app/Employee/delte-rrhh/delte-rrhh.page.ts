import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-delte-rrhh',
  templateUrl: './delte-rrhh.page.html',
  styleUrls: ['./delte-rrhh.page.scss'],
})
export class DelteRrhhPage implements OnInit {

  public sub : string;
  public user : any;

  constructor(
                private activatedRoute : ActivatedRoute,
                private router : Router,
                private loadingCtrl: LoadingController,
                public menuService: MenuService
             ) 
  { 
    this.sub = this.activatedRoute.snapshot.queryParams.sub;
    this.user = { normalizeAttr : [] };
  }

  async ngOnInit() 
  {
    await this.menuService.enableMenu(await this.menuService.getUserRoleFromStorage());
  }

  async ionViewWillEnter()
  {
    
    const loading = await this.loadingCtrl.create({
      message: 'Retrieving info. Please, wait...'
    });

    await loading.present();

    try
    {

      let params = {
        'queryStringParameters' :
        {
          'Username' : this.sub
        }
      };

      const res = await API.get('ERP', '/erp/getNormalizeUser', params);
      this.user = res;
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

  async disableUser(sub)
  {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait....'
    });

    try
    {

      const apiName = 'ERP'; // replace this with your api name.
      const path = '/erp/rrhh/disableUser'; // replace this with the path you have configured on your API
      const myInit = {
          body: {sub : this.sub }, // replace this with attributes you need
          headers: {}, // OPTIONAL
      };

      await loading.present();

      await API.put(apiName, path, myInit);

      loading.dismiss();

      this.router.navigate(['/list-rrhh']);
    }
    catch(err)
    {
      loading.dismiss();
    }
  }

}
