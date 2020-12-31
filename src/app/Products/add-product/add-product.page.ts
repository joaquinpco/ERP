import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

export class Producto
{
  public type: string;
  public name: string;
  public category: string;
  public description: string;
  public price: string;
  public quantity: string;
  public rawMaterials: Array<any>;

  constructor()
  {
    this.description = "";
  }
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
  public quantityMaterials = [];

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router
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


  async selectedRawMaterials($events)
  {
          let raw = $events.detail.value;
          this.quantityMaterials = [];

          //ask for quantity raw materials
          for(let i = 0; i < raw.length; i++)
          {
            const arrRawMaterials = raw[i].split(',');

            const id =  arrRawMaterials[0];
            const nombre = arrRawMaterials[1];
            const cantidadDisponible = arrRawMaterials[2];
    
            let alert = await this.alertController.create({
              header: nombre,
              message: "Input Quantity",
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

                    const cantidad = Number(value.data);

                    if((cantidadDisponible - cantidad) >= 0)
                    {
                      this.quantityMaterials.push(
                          {
                            id: id,
                            nombre: nombre,
                            cantidad: cantidad
                          });
                    }
                    else
                    {
                      const alert = await this.alertController.create({
                        cssClass: 'my-custom-class',
                        header: 'Alert',
                        subHeader: 'Stock Quantity under 0',
                        message: 'Stock quantity cannot stay below 0',
                        buttons: ['Ok']
                      });
                  
                      await alert.present();
                    }
                  }    
                }
              ]
            });
            await alert.present();
          }
  }

  async changeQuantity()
  {
    let alert = await this.alertController.create({
      header: "Change product quantity",
      message: "Input quantity",
      inputs: [
        {
          type: 'text',
          name: 'data'
        }
      ],
      buttons: [
        {
          text: 'Add',
          handler: (value) => {
            this.currentNumber = Number(value.data)
          }
        }
      ]
    });
    await alert.present();
  }

  async newProduct()
  {
    const loader = await this.loadingController.create({ message: 'Adding new product, please wait ...' });
   
    try
    {
      loader.present();

      const producto = this.producto;

      console.log(producto);
      console.log(this.quantityMaterials);

      const json = JSON.stringify(this.quantityMaterials);

      const postParams = {
        body: {
          tipo: producto.type,
          nombre: producto.name,
          descripcion: producto.description,
          precio: producto.price,
          quantity: this.currentNumber,
          category: producto.category,
          rawMaterials: json
        }
      }

      await API.post('ERP', '/erp/newProduct', postParams);

      loader.dismiss();

      this.router.navigate(['/list-product']);
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
      console.log(this.productcategories);
      const rawMaterials = await API.get('ERP', '/erp/rawMaterials', {});
      this.rawMaterials = rawMaterials;
      loader.dismiss();
    }
    catch(err){
      loader.dismiss();
    }
  }

}
