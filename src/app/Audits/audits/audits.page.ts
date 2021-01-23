import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.page.html',
  styleUrls: ['./audits.page.scss'],
})
export class AuditsPage implements OnInit {

  /* TODO: FINALIZE AUDIT TABLE frontend and backend */

  tablestyle = 'bootstrap';

  //Data Tests
  public rows: Array<any>;

  constructor(
    public navController: NavController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    
  }

  open(row)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          audit: JSON.stringify(row)
      }
    };

    this.navController.navigateForward(['/audit-detail'], navigationExtras);
  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({message: 'Fetching audits, please wait ...'});
    try{
      await loader.present();

      let audits = await API.get('ERP', '/erp/audits', {});
      console.log(audits);
      this.rows = audits;
      
      loader.dismiss();
    }
    catch(err){

    }
  }

}
