import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.page.html',
  styleUrls: ['./add-report.page.scss'],
})
export class AddReportPage implements OnInit {

  public feedback: boolean;
  public users: Array<any>;

  constructor(
    public alertController: AlertController
  ) { 
    this.feedback = false;
    this.users = [];
  }

  ngOnInit() {
  }

  newReport()
  {
      
  }

  async ionViewWillEnter()
  {
    const alert = await this.alertController.create({'message': 'Please wait...'});
    try
    {
      alert.present();

      const ressUser = await API.get('ERP', '/erp/rrhh/listUsers', {
        queryStringParameters: {}
      });
      this.users = ressUser;
      
      alert.dismiss()
    }
    catch(err){
      alert.dismiss();
    }
    finally
    {
      alert.dismiss();
    }
  }

}
