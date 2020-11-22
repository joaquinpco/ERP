import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.page.html',
  styleUrls: ['./list-report.page.scss'],
})
export class ListReportPage implements OnInit {

  public valoraciones: Array<any>;
  public user: any;

  constructor(
    public loadingController: LoadingController
  ) 
  {
    this.valoraciones = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({ message: 'Fetching info, please wait ...'});
    try
    {
      loader.present();

      const vlrcns = await API.get('ERP', '/erp/valoracion', {});
      this.valoraciones = vlrcns;
      console.log(this.valoraciones);
      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss()
    }
    finally
    {
      loader.dismiss();
    }
  }

}
