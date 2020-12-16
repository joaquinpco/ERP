import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { API, loadingOverlay } from 'aws-amplify';
import { type } from 'os';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-admin-add-concepts',
  templateUrl: './admin-add-concepts.page.html',
  styleUrls: ['./admin-add-concepts.page.scss'],
})
export class AdminAddConceptsPage implements OnInit {

  public codigo: string;
  public nombre: string;
  public conceptType: string;

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

  clearFields()
  {
    this.codigo = "";
    this.nombre = "";
    this.conceptType = "";
  }

  async newConcept()
  {
    
    const loader = await this.loadingController.create({ message: 'Adding new Concept, please wait...'});
    
    try
    {
      await loader.present();

      let params = {
        body: {
          codigo: this.codigo,
          nombre: this.nombre,
          tipo: this.conceptType
        }
      }

      if(this.codigo == undefined|| this.nombre == undefined 
        || this.conceptType == undefined)
      {
        throw('Fields could not be empty');
      }
      else
      {
        if(isNaN(Number(this.codigo)))
        {
          throw('Code has to be a number');
        }
      }


      await API.post('ERP', '/erp/newConcepto', params);
      
      this.clearFields();

      this.router.navigate(['/admin-list-concepts']);

      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();

      let alert = await this.alertController.create({
        message: err,
        header: 'Error',
        buttons: ['Dismiss']
      });

      alert.present();
    }
    finally
    {
      loader.dismiss();
    }
  }

}
