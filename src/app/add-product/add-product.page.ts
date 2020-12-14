import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  public currentNumber = 0;
  public productcategories;

  constructor(
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  private decrement()
  {
   if(this.currentNumber > 0)
    this.currentNumber--; 
  }

  private increment()
  {
    this.currentNumber++;
  }

  public newProduct()
  {

  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({ message: 'Fetching data, pls wait ...' });
    try
    {
      loader.present();
      const productCategories = await API.get('ERP', '/erp/productCategories', {});
      this.productcategories = productCategories;
      loader.dismiss();
    }
    catch(err){
      loader.dismiss();
    }
  }

}
