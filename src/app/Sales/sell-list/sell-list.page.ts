import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-sell-list',
  templateUrl: './sell-list.page.html',
  styleUrls: ['./sell-list.page.scss'],
})
export class SellListPage implements OnInit {

  public sales: Array<any>;

  constructor(
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({ message: "Fetching Sales, please wait ..." });
    loader.present();
    this.sales = await API.get('ERP', '/erp/sales', {});
     

    for(let sale of this.sales)
    {
      const employeeId = sale.sub

      const employeeParams = {
        queryStringParameters: {
          Username: employeeId
        }
      }

      sale.usuario = await API.get('ERP', '/erp/getNormalizeUser', employeeParams);
    }

    console.log(this.sales);


    loader.dismiss();
  }

}
