import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public loadingController: LoadingController,
    public router: Router
  ) {
    this.customers = [];
  }

  ngOnInit() {
  }

  async edit(id)
  {
    this.router.navigate(['/edit-customers'], { queryParams : { 'id' : id } });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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
