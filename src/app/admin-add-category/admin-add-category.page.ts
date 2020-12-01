import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.page.html',
  styleUrls: ['./admin-add-category.page.scss'],
})
export class AdminAddCategoryPage implements OnInit {

  public nombre: string;

  constructor(
    public loadingController: LoadingController,
    public router: Router,
    public alertController: AlertController,
    public menuService: MenuService
  ) { }

  async ngOnInit() 
  {
    await this.menuService.enableMenu(await this.menuService.getUserRoleFromStorage());
  }

  async newCategory()
  {
    const loader = await this.loadingController.create({ message: '' });
    try
    {
      loader.present();

      let params = {
        body: {
          nombre: this.nombre
        }
      }

      if(this.nombre == undefined)
      {
        throw("Name Field cannot be empty");
      }

      await API.post('ERP', '/erp/newCategory', params);

      loader.dismiss();
      this.router.navigate(['/admin-list-category']);
    }
    catch(err) 
    {
      loader.dismiss()
      
      let alert = await this.alertController.create({
        header: 'Error',
        subHeader: err,
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

}
