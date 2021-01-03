import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      public loadingController:LoadingController,
      public router: Router
    ) { 
    this.rawMaterials = [];
  }

  ngOnInit() {
  }

  edit(id) {
    this.router.navigate(['/edit-rawmaterial'], { queryParams : { 'id' : id } });
  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({ message: 'Fetching info, please wait ...' });
    try
    {
      loader.present();
      const rawMaterials = await API.get('ERP', '/erp/rawMaterials', {});
      this.rawMaterials = rawMaterials;
      loader.dismiss();
    }
    catch(err) 
    {
      loader.dismiss();
    }
  }

}
