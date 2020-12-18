import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

export class Producto
{
  public type: string;
  public name: string;
  public category: string;
  public description: string;
  public price: string;
  public rawMaterials: Array<number>;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
  providers: [Producto]
})

export class AddProductPage implements OnInit {

  public currentNumber = 0;
  public productcategories;
  public producto: Producto;
  public rawMaterials: Array<any>;

  constructor(
    public loadingController: LoadingController
  ) { 
    this.producto = new Producto();
    this.producto.type = 'INTANGIBLE';
    this.rawMaterials = [];
  }

  ngOnInit() {
  }

  private decrement()
  {
   if(this.currentNumber > 0)
    this.currentNumber--; 
  }

  private increment()
  {
    this.currentNumber += 1;
  }

  public getProductType(): boolean
  {
    return this.producto.type === 'TANGIBLE';
  }

  async newProduct()
  {
    const loader = await this.loadingController.create({ message: 'Adding new product, please wait ...' });
   
    try
    {
      loader.present();

      const producto = this.producto;

      loader.dismiss();
    }
    catch(err) 
    {
      loader.dismiss()
    }
  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({ message: 'Fetching data, pls wait ...' });
    try
    {
      loader.present();
      const productCategories = await API.get('ERP', '/erp/productCategories', {});
      this.productcategories = productCategories;
      const rawMaterials = await API.get('ERP', '/erp/rawMaterials', {});
      this.rawMaterials = rawMaterials;
      loader.dismiss();
    }
    catch(err){
      loader.dismiss();
    }
  }

}
