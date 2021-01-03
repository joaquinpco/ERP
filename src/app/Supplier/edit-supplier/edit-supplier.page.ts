import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.page.html',
  styleUrls: ['./edit-supplier.page.scss'],
})
export class EditSupplierPage implements OnInit {

  public fullname: string;
  public phone: string;
  public email: string;

  public supplierId: Number;

  public supplier: any;


  constructor(
    public loader: LoadingController,
    public alertController: AlertController,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    this.supplierId = this.activatedRoute.snapshot.queryParams.id;
  }

  ngOnInit() {
  }

  async updateSupplier(id)
  {
    const loader = await this.loader.create({message: "Fetching info, please wait ..."});

    try
    {
      loader.present();

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

        const putParams = {
          body: {
            nombre: this.fullname,
            telefono: this.phone,
            email: this.email,
            supplierId: this.supplierId
          }
        }
      
        await API.put('ERP', '/erp/updateSupplier', putParams);

        this.router.navigate(['/list-suppliers']);
      }

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

  async ionViewWillEnter()
  {
    const loader = await this.loader.create({message: "Fetching info, please wait ..."});

    try
    {
      await loader.present();

      const queryParams = {
        'queryStringParameters': {
          id: this.supplierId,
          queryType: 1
        }
      }

      let supplier = await API.get('ERP', '/erp/suppliers', queryParams);
      this.supplier = supplier;
      console.log(this.supplier);

      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();
    }
    
  }

}
