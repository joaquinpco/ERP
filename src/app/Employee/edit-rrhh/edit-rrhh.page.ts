import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { API } from 'aws-amplify';
import { CameraService } from '../../services/camera.service';
import { MenuService } from '../../services/menu.service';

export class EditUser
{
  public firstname: string;
  public lastname: string;
  public role: string;
  public nif: string;
  public phone: string;
  public nss: string;
  public address: string;
}

@Component({
  selector: 'app-edit-rrhh',
  templateUrl: './edit-rrhh.page.html',
  styleUrls: ['./edit-rrhh.page.scss']
})
export class EditRrhhPage implements OnInit {

  public sub : string;
  public user : any;
  public edituser : EditUser;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    public loadingCtrl: LoadingController,
    private myCameraService: CameraService,
    public alertController: AlertController,
    public menuService: MenuService
             ) 
  { 
    this.sub = this.activatedRoute.snapshot.queryParams.sub;
    this.user = { normalizeAttr : [] };
    this.edituser = new EditUser();
  }

  async ngOnInit() 
  {
    await this.menuService.enableMenu(await this.menuService.getUserRoleFromStorage());
  }

  async updateUser(sub)
  {
    const loading = await this.loadingCtrl.create({
      message: 'Updating profile. Please, wait...'
    });
    try
    {
      if(this.edituser.firstname == "" || this.edituser.lastname == "" || 
        this.edituser.role == "" || this.edituser.phone == "" || 
        this.edituser.nss == "" || this.edituser.address == "" ||
        this.edituser.nif == "")
      {
        throw("Fields cannot be empty");
      }
      else
      {
        const putParams = {
          body: {
            firstname: this.edituser.firstname,
            lastname: this.edituser.lastname,
            role: this.edituser.role,
            phone: this.edituser.phone,
            nss: this.edituser.nss,
            address: this.edituser.address,
            nif: this.edituser.nif,
            sub: sub,
            updateType: 2
          }
        }
        await loading.present();
        
        await API.put('ERP', '/erp/updateEmployee', putParams);

        this.router.navigate(['/list-rrhh']);

        loading.dismiss();
      }
    }
    catch(err)
    {

      loading.dismiss();
      
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
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
  
  async ionViewWillEnter()
  {
    
    const loading = await this.loadingCtrl.create({
      message: 'Retrieving info. Please, wait...'
    });

    await loading.present();

    try
    {

      let params = {
        'queryStringParameters' :
        {
          'Username' : this.sub
        }
      };

      const res = await API.get('ERP', '/erp/getNormalizeUser', params);
      this.user = res;
      this.loadingCtrl.dismiss();
    }
    catch(err)
    {
      console.error(err);
    }
    finally
    {
      this.loadingCtrl.dismiss();
    }
  }

  async enableUser(sub)
  {
    try
    {
      const apiName = 'ERP'; // replace this with your api name.
      const path = '/erp/rrhh/enableUser'; // replace this with the path you have configured on your API
      const myInit = {
          body: {sub : sub }, // replace this with attributes you need
          headers: {}, // OPTIONAL
      };

      API
        .put(apiName, path, myInit)
        .then(response => {
          this.router.navigate(['list-rrhh']);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
    catch(err)
    {
      this.router.navigate(['list-rrhh']);
    }
  }
}
