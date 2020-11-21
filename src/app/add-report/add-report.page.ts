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
  public fileBase64 : any;
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

      console.log(this.fileBase64)

      const postParams = {
        body: {
          feedback: this.feedback,
          sub: this.sub,
          informe: this.fileBase64,
          name: this.file.name,
          periodo: this.period
        }
      }

      const res = await API.post('ERP', '/erp/createUserReport', postParams);

      this.router.navigate(['/list-report']);
    }
    catch(err)
    {
      loader.dismiss();
      console.log(err)
    }
    finally
    {
      loader.dismiss();
    }
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
    console.log(this.file);

    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.fileBase64 = reader.result;
    }
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
