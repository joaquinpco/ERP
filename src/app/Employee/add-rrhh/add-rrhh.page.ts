import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';

export class Signupuser
{
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  role: string;
  phone: string;
  nss: string;
  address: string;
  nif: string;
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
              public loadingCtrl: LoadingController,
              public menuService: MenuService
             ) 
  {
    this.signupuser = new Signupuser();
  }

  async ngOnInit() 
  {
    await this.menuService.enableMenu(await this.menuService.getUserRoleFromStorage());
  }

  async signup()
  {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait....'
    });

    try
    {
      await loading.present();

      let empty = true;
    
      if(this.signupuser.username == undefined || this.signupuser.firstname == undefined 
        || this.signupuser.lastname == undefined || this.signupuser.role == undefined || 
        this.signupuser.password == undefined || this.signupuser.phone == undefined || 
        this.signupuser.nss == undefined || this.signupuser.address == undefined ||
        this.signupuser.nif == undefined)
      {
        throw("Blank Inputs");
      }
      if(this.signupuser.nif.length < 9)
      {
        throw("Not valid NIF");
      }
      if(this.signupuser.nss.length < 11)
      {
        throw("Not valid nss");
      }
      const expresion = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;

      if(!this.signupuser.phone.match(expresion))
      {
        throw("Invalid Phone number");
      }

      const postParams = {
        body: {
          email: this.signupuser.username,
          firstname: this.signupuser.firstname,
          lastname: this.signupuser.lastname,
          role: this.signupuser.role,
          tempPassword: this.signupuser.password,
          phone: this.signupuser.phone,
          nss: this.signupuser.nss,
          address: this.signupuser.address,
          nif: this.signupuser.nif
        }
      }

      const res = await API.post('ERP', '/erp/rrhh/newEmployee', postParams);

      loading.dismiss();
      if(res.code == "UsernameExistsException")
      {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Alert',
          subHeader: 'Employee email already exist',
          message: 'Submitted employee email was registered previously.',
          buttons: ['OK']
        });
    
        await alert.present();
      }
      else
      {
        this.route.navigate(['/list-rrhh'])
      }
    }
    catch(err)
    {
      loading.dismiss();

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: '',
        message: err,
        buttons: ['OK']
      });
  
      await alert.present();
    }
    finally
    {
      loading.dismiss();
    }
    
    
  }

}
