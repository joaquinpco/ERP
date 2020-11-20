import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';
import { CameraService } from '../services/camera.service';

export class EditUser
{
  public firstname: string;
  public lastname: string;
  public role: string;
  public nif: string;
  public phone: string;
  public nss: string;
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
                private myCameraService: CameraService
             ) 
  { 
    this.sub = this.activatedRoute.snapshot.queryParams.sub;
    this.user = { normalizeAttr : [] };
    this.edituser = new EditUser();
  }

  ngOnInit() 
  {
    
  }

  async updateProfilePicture()
  {
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
          body: {sub : this.sub }, // replace this with attributes you need
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
