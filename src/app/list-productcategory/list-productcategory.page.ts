import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-list-productcategory',
  templateUrl: './list-productcategory.page.html',
  styleUrls: ['./list-productcategory.page.scss'],
})
export class ListProductcategoryPage implements OnInit {

  public productCategories: Array<any>;

  constructor(
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({ message: 'Fetching product categories ...' });
    try
    {
      loader.present();
      this.productCategories = await API.get('ERP', '/erp/productCategories', {});
      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();
    }
  }

}
