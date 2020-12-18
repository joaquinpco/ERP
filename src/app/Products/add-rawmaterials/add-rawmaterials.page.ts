import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

export class RawMaterial{
  public name: string;
  public weight: string;
  public quantity: string;
  public price: string;
}

@Component({
  selector: 'app-add-rawmaterials',
  templateUrl: './add-rawmaterials.page.html',
  styleUrls: ['./add-rawmaterials.page.scss'],
})

export class AddRawmaterialsPage implements OnInit {

  public rawMaterial: RawMaterial;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router
  ) 
  { 
    this.rawMaterial = new RawMaterial();
  }

  async newRawMaterial()
  {
    const loader = await this.loadingController.create({ message: 'Adding new raw material, please wait ...' });
   
    try
    {
      loader.present();
      console.log(this.rawMaterial);

      if(this.rawMaterial.name === undefined || this.rawMaterial.price === undefined || 
          this.rawMaterial.quantity === undefined || this.rawMaterial.weight === undefined)
      {
        throw("Inputs cannot be empty");
      }
      else
      {
        if(isNaN(+this.rawMaterial.price))
        {
          throw("Price have to be a number");
        }
        if(isNaN(+this.rawMaterial.quantity))
        {
          throw("Quantity have to be a number");
        }
        if(isNaN(+this.rawMaterial.weight))
        {
          throw("Weight have to be a number");
        }
      }

      let postParams = {
        body: {
          name: this.rawMaterial.name,
          weight: this.rawMaterial.weight,
          price: this.rawMaterial.price,
          quantity: this.rawMaterial.quantity
        }
      }
      
      await API.post('ERP', '/erp/newRawMaterial', postParams);

      loader.dismiss();
      this.router.navigate(['/list-rawmaterials']);
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
      alert.present()
    }

  }

  ngOnInit() {
  }

}
