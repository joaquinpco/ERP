import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-list-rawmaterials',
  templateUrl: './list-rawmaterials.page.html',
  styleUrls: ['./list-rawmaterials.page.scss'],
})
export class ListRawmaterialsPage implements OnInit {

  public rawMaterials: Array<any>;

  constructor(
      public loadingController:LoadingController
    ) { 
    this.rawMaterials = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({ message: 'Fetching info, please wait ...' });
    try
    {
      loader.present();
      const rawMaterials = await API.get('ERP', '/erp/rawMaterials', {});
      this.rawMaterials = rawMaterials;
      console.log(this.rawMaterials);
      loader.dismiss();
    }
    catch(err) 
    {
      loader.dismiss();
    }
  }

}
