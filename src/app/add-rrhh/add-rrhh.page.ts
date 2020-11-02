import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { API } from 'aws-amplify';

export class Signupuser
{
  username: String;
  firstname: String;
  lastname: String;
  password: String;
  role: String;
};

function checkProperties(obj) {
  for (var key in obj) {
      if (obj[key] !== null && obj[key] != "")
          return false;
  }
  return true;
}

@Component({
  selector: 'app-add-rrhh',
  templateUrl: './add-rrhh.page.html',
  styleUrls: ['./add-rrhh.page.scss'],
})

export class AddRrhhPage implements OnInit {

  public signupuser: Signupuser;

  constructor(public alertController: AlertController) 
  {
    this.signupuser = new Signupuser();
  }

  ngOnInit() {}

  async signup()
  {
    if(checkProperties(this.signupuser))
    {
      try
      {
        var postParams = {
          body: {
            email: this.signupuser.username,
            firstname: this.signupuser.firstname,
            lastname: this.signupuser.lastname,
            role: this.signupuser.role,
            tempPassword: this.signupuser.password
          }
        }

        API.post('ERP', 'newEmployee', postParams);
      }
      catch(err)
      {
        console.error(err);
      }
    }
    else
    {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Please fill all inputs.',
        buttons: ['OK'] 
      });
  
      await alert.present();
    }
  }

}
