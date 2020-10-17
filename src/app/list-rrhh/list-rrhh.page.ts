import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-list-rrhh',
  templateUrl: './list-rrhh.page.html',
  styleUrls: ['./list-rrhh.page.scss'],
})

export class ListRRHHPage implements OnInit {

  public usersData:Object;

  constructor() {}

  ngOnInit() {}

  async ionViewWillEnter()
  {
    this.usersData = await API.get('rrhh', '/rrhh', {
      queryStringParameters: {}
    });
    
    console.log(this.usersData);
  }

}
