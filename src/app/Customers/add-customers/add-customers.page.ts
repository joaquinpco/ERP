import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.page.html',
  styleUrls: ['./add-customers.page.scss'],
})
export class AddCustomersPage implements OnInit {

  public fullname: string;
  public address: string;
  public phone: string;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async newCustomer()
  {
    const loader = await this.loadingController.create({ message: "Adding new customer, please wait ..."}); 
    try
    {
      loader.present();

      const postParams = {
        body: {
          fullname: this.fullname,
          address: this.address,
          phone: this.phone
        }
      }

      if(this.fullname === undefined || this.address === undefined || this.phone === undefined)
      {
        throw("Inputs cannot be empty");
      }
      else
      {
        const expresion = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;

        if(!this.phone.match(expresion))
        {
          throw("Invalid Phone number");
        }
      }

      await API.post('ERP', '/erp/newCustomer', postParams);

      this.router.navigate(['/list-customers'])

      loader.dismiss();
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

      alert.present();
      loader.dismiss();
    }
  }

}
