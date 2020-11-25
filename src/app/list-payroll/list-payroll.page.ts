import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-list-payroll',
  templateUrl: './list-payroll.page.html',
  styleUrls: ['./list-payroll.page.scss'],
})

export class ListPayrollPage implements OnInit {

  public payrolls: Array<any>;
  public user: any;
  public category: any;

  constructor(
    public loadingCtrl: LoadingController
  ) 
  {
    this.payrolls = [];
    this.user = new Object();
    this.category = new Object();
    this.user.normalizeAttr = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {

    const loader = await this.loadingCtrl.create({ message: 'Fetching Payrolls, please wait ...'})
    try
    {
      loader.present();

      const ressPayroll = await API.get('ERP', '/erp/nominas', {});
      this.payrolls = ressPayroll;

      for(let i = 0; i < this.payrolls.length; i++)
      {
        const params = {
          'queryStringParameters' : {
            Username: this.payrolls[i].sub
          }
        }

        const paramsCategory = {
          'queryStringParameters' : {
            queryType: 2,
            pkCategorias: this.payrolls[i].categoria_id
          }
        }

        this.user =  await API.get('ERP', '/erp/getNormalizeUser', params);

        this.category = await API.get('ERP', '/erp/categorias', paramsCategory);
        

        this.payrolls[i].user = this.user;
        this.payrolls[i].category = this.category;

        loader.dismiss();
      }
      console.log(this.payrolls);
    }
    catch(err)
    {
      loader.dismiss();
    }
  }

}
