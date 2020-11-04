import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';
import { Router } from '@angular/router';

export class Signupuser
{
  username: String;
  firstname: String;
  lastname: String;
  password: String;
  role: String;
};

@Component({
  selector: 'app-add-rrhh',
  templateUrl: './add-rrhh.page.html',
  styleUrls: ['./add-rrhh.page.scss'],
})

export class AddRrhhPage implements OnInit {

  public signupuser: Signupuser;

  constructor(
              public alertController: AlertController, 
              public route:Router,
              public loadingCtrl: LoadingController
             ) 
  {
    this.signupuser = new Signupuser();
  }

  ngOnInit() {}

  checkProperties() {
    
    let empty = true;
    
    if(this.signupuser.username == undefined || this.signupuser.firstname == undefined 
      || this.signupuser.lastname == undefined || this.signupuser.role == undefined || 
      this.signupuser.password == undefined)
    {
      empty = false;
    }

    return empty;
  }

  async signup()
  {
    if(this.checkProperties())
    {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait....'
      });

      try
      {
        await loading.present();

        const postParams = {
          body: {
            email: this.signupuser.username,
            firstname: this.signupuser.firstname,
            lastname: this.signupuser.lastname,
            role: this.signupuser.role,
            tempPassword: this.signupuser.password
          }
        }

        await API.post('ERP', '/erp/rrhh/newEmployee', postParams);

        loading.dismiss();

      }
      catch(err)
      {
        console.log(err);
        this.route.navigate(['/list-rrhh']);
        if(err.name == "UsernameExistsException")
        {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Alert',
            subHeader: 'Employee already exist',
            message: 'Submitted employee was registered previously.',
            buttons: ['OK']
          });
      
          await alert.present();
        }
      }
      finally
      {
        loading.dismiss();
      }
    }
    else
    {
      
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Some inputs are empty',
        message: 'Fill all inputs before submitting data.',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }

}
