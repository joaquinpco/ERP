import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public loader: LoadingController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  edit(id) {
    console.log(id);
    this.router.navigate(['/edit-supplier'], { queryParams : { 'id' : id } });
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
