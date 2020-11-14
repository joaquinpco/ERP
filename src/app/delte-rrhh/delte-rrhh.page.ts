import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-delte-rrhh',
  templateUrl: './delte-rrhh.page.html',
  styleUrls: ['./delte-rrhh.page.scss'],
})
export class DelteRrhhPage implements OnInit {

  public sub : string;

  constructor(
                private activatedRoute : ActivatedRoute,
                private router : Router,
                private loadingCtrl: LoadingController
             ) 
  { 
    this.sub = this.activatedRoute.snapshot.queryParams.sub;
  }

  ngOnInit() {
  }

  async disableUser(sub)
  {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait....'
    });

    try
    {

      const apiName = 'ERP'; // replace this with your api name.
      const path = '/erp/rrhh/disableUser'; // replace this with the path you have configured on your API
      const myInit = {
          body: {sub : this.sub }, // replace this with attributes you need
          headers: {}, // OPTIONAL
      };

      await loading.present();

      await API.put(apiName, path, myInit);

      loading.dismiss();

      this.router.navigate(['/list-rrhh']);
    }
    catch(err)
    {
      loading.dismiss();
    }
  }

}
