import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-rrhh',
  templateUrl: './list-rrhh.page.html',
  styleUrls: ['./list-rrhh.page.scss'],
})

export class ListRRHHPage implements OnInit {

  public users:Array<any>;

  constructor(
    public loadingCtrl: LoadingController,
    public router: Router
  ) 
  {
    this.users = [];
  }

  ngOnInit() {}

  edit(sub : string)
  {
    this.router.navigate(['/edit-rrhh'], { queryParams : { 'sub' : sub } });
  }

  remove(sub : string)
  {
    this.router.navigate(['/delte-rrhh'], { queryParams : { 'sub' : sub } });
  }

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
      console.log(this.users);
      loading.dismiss();
    }
    catch(err)
    {
      console.log(err);
    }
    
  }

}
