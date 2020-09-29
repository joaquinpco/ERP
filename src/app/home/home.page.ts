import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, API } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(
    public router: Router
  ) {}

  async ngOnInit()
  {
    try
    {
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
    const ress = await API.get('rrhh', '/rrhh', {
      queryStringParameters: {}
    });
    console.log(ress);
  }
}
