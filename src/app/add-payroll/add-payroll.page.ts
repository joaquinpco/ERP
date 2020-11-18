import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-add-payroll',
  templateUrl: './add-payroll.page.html',
  styleUrls: ['./add-payroll.page.scss'],
})
export class AddPayrollPage implements OnInit {

  public users:Array<any>;
  public nominas:Array<any>;

  constructor(
                public loadingCtrl: LoadingController
  ) 
  {
    this.users = [];
    this.nominas = [];
  }

  newPayroll()
  {
    console.log("Clicked");
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

      const ressNomina = await API.get('ERP', '/erp/nominas', {
        queryStringParameters: {}
      });

      this.users = ressUser.Users;
      this.nominas = ressNomina;

      console.log(this.nominas);
      loading.dismiss();
    }
    catch(err)
    {
      console.log(err);
    }
  }


}
