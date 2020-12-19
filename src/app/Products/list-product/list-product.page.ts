import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
})
export class ListProductPage implements OnInit {

  public products: Array<any>;
  
  constructor(
    public loadingController: LoadingController
  ) { 
    this.products = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({message: 'Fetching data, please wait ...'});
    try
    {
      loader.present();  
      const prods = await API.get('ERP', '/erp/products', {});
      console.log(prods);
      this.products = prods;
      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();
    }
  }

}
