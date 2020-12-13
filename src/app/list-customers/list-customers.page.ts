import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.page.html',
  styleUrls: ['./list-customers.page.scss'],
})
export class ListCustomersPage implements OnInit {

  public customers: Array<any>;

  constructor(
    public loadingController: LoadingController
  ) {
    this.customers = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({message: "Fetching data, please wait ..."});
    loader.present();
    let customers = await API.get('ERP', '/erp/customers', {});
    this.customers = customers;
    loader.dismiss()
  }

}
