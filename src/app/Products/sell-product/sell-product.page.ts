import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.page.html',
  styleUrls: ['./sell-product.page.scss'],
})
export class SellProductPage implements OnInit {

  public customers: Array<any>;
  public products: Array<any>;

  constructor(
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async newSell()
  {

  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({ message: "Fetching data, please wait ..." });
    try{
      loader.present();

      const customers = await API.get('ERP', '/erp/customers', {});
      this.customers = customers;
      const products = await API.get('ERP', '/erp/products', {});
      this.products = products;

      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();
    }
  }

}
