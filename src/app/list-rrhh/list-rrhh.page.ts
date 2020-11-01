import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list-rrhh',
  templateUrl: './list-rrhh.page.html',
  styleUrls: ['./list-rrhh.page.scss'],
})

export class ListRRHHPage implements OnInit {

  public users:Array<any>;

  constructor(
    public loadingCtrl: LoadingController,
  ) 
  {
    this.users = [];
  }

  ngOnInit() {}

  async ionViewWillEnter()
  {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait....'
    });
    await loading.present();

    try
    {
      const ress = await API.get('ERP', '/erp/rrhh/listUsers', {
        queryStringParameters: {}
      });
      this.users = ress.Users;

      loading.dismiss();
    }
    catch(err)
    {
      console.log(err);
    }
    
  }

}
