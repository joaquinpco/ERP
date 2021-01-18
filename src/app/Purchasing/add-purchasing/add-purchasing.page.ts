import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
    public alertController: AlertController,
    public router: Router,
    public loadingController: LoadingController
  ) { 
    this.rawMaterialId = this.activatedRoute.snapshot.queryParams.id;
    this.rawMaterial = [];
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

            const loader = await this.loadingController.create({message: 'Purchasing new raw material, please wait ...'});
            
            loader.present();
            const postParams = {
              body: {
                id: this.rawMaterial.id,
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

            loader.dismiss();
            this.router.navigate(['/list-rawmaterials'])
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
    console.log(rawMaterial);
    const queryParamsSP = {
      'queryStringParameters': {
        id: this.rawMaterial.proveedor_id,
        queryType: 1
      }
    }

    let supplier = await API.get('ERP', '/erp/suppliers', queryParamsSP)
    console.log(supplier);
    this.rawMaterial.supplier = supplier;

    //location.reload();
  }

}
