import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-admin-list-category',
  templateUrl: './admin-list-category.page.html',
  styleUrls: ['./admin-list-category.page.scss'],
})
export class AdminListCategoryPage implements OnInit {

  public categories: Array<any>;

  constructor(
    public loadingController: LoadingController
  ) 
  {
    this.categories = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({ message: 'Fetching info, please wait ...' });
    try
    {
      await loader.present()

      const params = {
        'queryStringParameters': {
          queryType: 1
        }
      }

      const ctgrs =  await API.get('ERP', '/erp/categorias', params);

      this.categories = ctgrs;

      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();
    }
  }

}
