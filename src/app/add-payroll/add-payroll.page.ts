import { isEmptyExpression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-add-payroll',
  templateUrl: './add-payroll.page.html',
  styleUrls: ['./add-payroll.page.scss'],
})
export class AddPayrollPage implements OnInit {

  public users : Array<any>;
  public conceptos : Array<any>;
  public conceptosSelected : Array<any>;

  constructor(
                public loadingCtrl: LoadingController
  ) 
  {
    this.users = [];
    this.conceptos = [];
    this.conceptosSelected = [];
  }

  async newPayroll()
  {
    console.log("Clicked");
    this.conceptos.push({
      codigo: 123,
      nombre: 'perico perez',
      porcentaje: 12.3
    });
    console.log(this.conceptos)
  }

  seeChange()
  {
    console.log(this.conceptos);
    console.log(this.conceptosSelected);
  }

  ngOnInit() {}

  async ionViewWillEnter()
  {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait....'
    });
    await loading.present();
    try
    {
      const ressUser = await API.get('ERP', '/erp/rrhh/listUsers', {
        queryStringParameters: {}
      });

      const ressConcepto = await API.get('ERP', '/erp/concepto', {
        queryStringParameters: {}
      });
      
      this.users = ressUser.Users;
      this.conceptos = ressConcepto;

      // TODO: remove the next line
      this.newPayroll();

      loading.dismiss();
    }
    catch(err)
    {
      console.log(err);
    }
  }


}
