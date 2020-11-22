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
  public fileBase64 : any;
  public fileName: string;

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
      loader.present();

      let name = this.fileName.split('.')[0];
      let type = this.file.type;
      let fullFileString = name + Math.floor((Math.random() * 1000) + 1) + '.' + type.split('/')[1];
      console.log(fullFileString);
      
      const postParams = {
        body: {
          feedback: this.feedback,
          sub: this.sub,
          informe: this.fileBase64,
          name: fullFileString,
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
    this.fileName = this.file.name;
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
