import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.page.html',
  styleUrls: ['./add-supplier.page.scss'],
})
export class AddSupplierPage implements OnInit {

  public fullname: string;
  public phone: string;
  public email: string;

  constructor(
    public alertController: AlertController,
    public route: Router
  ) { }

  ngOnInit() {
  }

  async newSupplier() {
    try
    {
      if(this.fullname === undefined || this.phone === undefined 
          || this.email === undefined)
      {
        throw("Fields cannot be empty");
      }
      else
      {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const expresion = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;

        if(!this.phone.match(expresion))
        {
          throw("Incorrect Phone number");
        }
        if(!this.email.match(re))
        {
          throw("Incorrect email");
        }

        const postParams = {
          body: {
            nombre: this.fullname,
            telefono: this.phone,
            email: this.email
          }
        }

        await API.post('ERP', '/erp/newSupplier', postParams);
        this.route.navigate(['/list-suppliers'])

      }
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
    }
  }

}
