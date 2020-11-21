import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.page.html',
  styleUrls: ['./add-report.page.scss'],
})
export class AddReportPage implements OnInit {

  public feedback: boolean;
  public users: Array<any>;
  public sub: string;
  public file: File;
  public period: string;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router
  ) { 
    this.feedback = false;
    this.users = [];
  }

  ngOnInit() {
  }

  async newReport()
  {

    const loader = await this.loadingController.create({message: 'Adding new report, please wait ..'});

    try
    {
      console.log("Feedback:" + this.feedback + " Sub: " + this.sub + "File: " + this.file.name  + " Period: " + this.period);
    
      loader.present();

      const postParams = {
        body: {
          feedback: this.feedback,
          sub: this.sub,
          informe: this.file,
          periodo: this.period
        }
      }

      const res = await API.post('ERP', '/erp/createUserReport', postParams);

      this.router.navigate(['/list-report']);
    }
    catch(err)
    {
      loader.dismiss();
    }
    finally
    {
      loader.dismiss();
    }
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
    console.log(this.file);
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
