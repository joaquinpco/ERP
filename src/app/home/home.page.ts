import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, API } from 'aws-amplify';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public action : string;
  public users : Array<any>;

  constructor(
    public router: Router,
    public menuCtrl: MenuController
  )
  {
    this.users = [];
  }

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
    const ress = await API.get('rrhh', '/rrhh', {
      queryStringParameters: {}
    });

    this.users = ress.Users;
    console.log(ress);
  }

}
