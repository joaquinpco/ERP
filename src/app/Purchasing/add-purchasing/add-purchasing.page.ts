import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-add-purchasing',
  templateUrl: './add-purchasing.page.html',
  styleUrls: ['./add-purchasing.page.scss'],
})
export class AddPurchasingPage implements OnInit {

  public rawMaterialId: Number;
  public rawMaterial: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController
  ) { 
    this.rawMaterialId = this.activatedRoute.snapshot.queryParams.id;
  }

  ngOnInit() {
  }

  async payWithPaypal()
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Introduce quantity!',
      inputs: [
        {
          name: 'quantity',
          type: 'text',
          placeholder: 'Introduce Raw Material Quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (value) => {

            const postParams = {
              body: {
                returnurl: '/list-rawmaterials',
                cancelurl: '/home',
                name: this.rawMaterial.nombre,
                quantity: value.quantity,
                price: this.rawMaterial.precio,
                total: Number(value.quantity) * Number(this.rawMaterial.precio),
                paymentDescription: "Pending payment for transfering to supplier" + this.rawMaterial.supplier.nombre + 
                  ". Paypal email: " + this.rawMaterial.supplier.email
              }
            }

            await API.post('ERP', '/erp/payWithPaypal', postParams);
          }
        }
      ]
    });

    await alert.present();
  }

  async ionViewWillEnter()
  {
    const queryParamsRM = {
      'queryStringParameters': {
        id: this.rawMaterialId,
        queryType: 1
      }
    }

    let rawMaterial = await API.get('ERP', '/erp/rawMaterials', queryParamsRM);
    this.rawMaterial = rawMaterial;

    const queryParamsSP = {
      'queryStringParameters': {
        id: this.rawMaterial.proveedor_id,
        queryType: 1
      }
    }

    let supplier = await API.get('ERP', '/erp/suppliers', queryParamsSP)
    console.log(supplier);
    this.rawMaterial.supplier = supplier;
  }

}
