import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-admin-list-concepts',
  templateUrl: './admin-list-concepts.page.html',
  styleUrls: ['./admin-list-concepts.page.scss'],
})
export class AdminListConceptsPage implements OnInit {

  public concepts: Array<any>;
  
  constructor(
    public loadingController: LoadingController
  ) {
    this.concepts = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({ message: 'Fetching info, please wait ...' });
    try
    {
      await loader.present()

      const cncpts =  await API.get('ERP', '/erp/concepto', {});

      this.concepts = cncpts;

      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();
    }
  }

}
