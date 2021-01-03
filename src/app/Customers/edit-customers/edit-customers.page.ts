import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.page.html',
  styleUrls: ['./edit-customers.page.scss'],
})
export class EditCustomersPage implements OnInit {

  public customerId: string
  public customer: any;

  public fullname: string;
  public phone: string;
  public address: string;


  constructor(
    public loader: LoadingController,
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public router: Router
  ) { 
    this.customerId = this.activatedRoute.snapshot.queryParams.id;
  }

  ngOnInit() {
  }

  async updateCustomer(id)
  {
    const loader = await this.loader.create({ message: "Fetching data, pleasw wait ..." });

    try
    {
      await loader.present();

      if(this.fullname === undefined || this.address === undefined 
          || this.customer === undefined)
      {
        throw("Fields cannot be empty");
      }
      else
      {
        let putParams = {
          body: {
            id: id,
            nombre: this.fullname,
            direccion: this.address,
            telefono: this.phone
          }
        }
        API.put('ERP', '/erp/updateCustomer', putParams);
        loader.dismiss();
        this.router.navigate(['/list-customers']);
      }
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
    const loader = await this.loader.create({ message: "Fetching data, pleasw wait ..." });
    try
    {
      await loader.present();

      const queryParams = {
        'queryStringParameters': {
          customerId: this.customerId,
          queryType: 1
        }
      }

      let customer = await API.get('ERP', '/erp/customers', queryParams);
      this.customer = customer;
      console.log(this.customer);

      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();
    }
  }

}
