import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-list-rrhh',
  templateUrl: './list-rrhh.page.html',
  styleUrls: ['./list-rrhh.page.scss'],
})

export class ListRRHHPage implements OnInit {

  public users:Array<any>;

  constructor() 
  {
    this.users = [];
  }

  ngOnInit() {}

  async ionViewWillEnter()
  {
    const ress = await API.get('rrhh', '/rrhh', {
      queryStringParameters: {}
    });

    this.users = ress.Users;

    console.log(this.users);
  }

}
