import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-list-suppliers',
  templateUrl: './list-suppliers.page.html',
  styleUrls: ['./list-suppliers.page.scss'],
})
export class ListSuppliersPage implements OnInit {

  public suppliers: Array<any>;

  constructor(
    public loader: LoadingController
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {
    const loader = await this.loader.create({ message: 'Fetching info, please wait ...' });
    try
    {
      await loader.present();
      this.suppliers = await API.get('ERP', '/erp/suppliers', {});
      console.log(this.suppliers);
      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();
    }
  }

}
