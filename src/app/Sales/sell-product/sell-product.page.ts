import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.page.html',
  styleUrls: ['./sell-product.page.scss'],
})
export class SellProductPage implements OnInit {

  public customers: Array<any>;
  public products: Array<any>;
  public availableUnits: number;
  public currentUser: any;

  public customer: string;
  public productsSelect: Array<any>;
  public productsAux: Array<any>;
  public quantity: string;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async selectedProducts($events)
  {
    let productList = $events.detail.value;
    
    //Clear previous product, preventing previous ones.
    this.productsAux = [];

    for(let product of productList)
    {
      console.log(product);
      const units = Number(product.split('-')[1]);

      const message = "Available units:" + units;

      let alert = await this.alertController.create({
        header: product.split('-')[2],
        message: message,
        inputs: [
          {
            type: 'text',
            name: 'data'
          }
        ],
        buttons: [
          {
            text: 'Add',
            handler: async (value) => {
              const quantity = value.data;
              console.log(quantity);
              if(quantity === undefined || Number(quantity) <= 0)
              {
                try
                {
                  throw("Error in input");
                }
                catch(err)
                {
                  const alert = await this.alertController.create({
                    cssClass: 'my-custom-class',
                    header: 'Alert',
                    subHeader: '',
                    message: err,
                    buttons: ['OK']
                  });

                  await alert.present();
                }
              }
              else
              {
                if(units - Number(quantity) < 0)
                {
                  try
                  {
                    throw("Available units:" + units);
                  }
                  catch(err)
                  {
                    const alert = await this.alertController.create({
                      cssClass: 'my-custom-class',
                      header: 'Alert',
                      subHeader: '',
                      message: err,
                      buttons: ['OK']
                    });
  
                    await alert.present();
  
                    productList = [];
                    this.productsAux = [];
                  }
                }
                else
                {
                  this.productsAux.push({
                    id: Number(product.split('-')[0]),
                    cantidad: quantity
                  });
                }
              }
            }
          }
        ]})

      await alert.present();

      
    }

  }

  async newSell()
  {
    const loader = await this.alertController.create({message: 'Adding new sale, please wait ..'})
    try
    {
      loader.present();
      if(this.customer === undefined)
      {
        throw("Select a customer!");
      }
      if(this.productsAux === undefined || this.productsAux.length == 0)
      {
        throw("Producs list have to be set");
      }

      const json = JSON.stringify(this.productsAux);

      const postParams = {
        body: {
          productos: json,
          cliente: this.customer,
          sub: this.currentUser.username
        }
      }

      await API.post('ERP', '/erp/newBill', postParams);
      loader.dismiss();
      this.router.navigate(['/sell-list']);
    }
    catch(err)
    {
      loader.dismiss();
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: '',
        message: err,
        buttons: ['OK']
      });

      alert.present();
    }

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
      this.currentUser = await Auth.currentUserInfo();
      console.log(this.currentUser);

      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();
    }
  }

}
