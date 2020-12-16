import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';
import { LoadingController } from '@ionic/angular';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.page.html',
  styleUrls: ['./list-report.page.scss'],
})
export class ListReportPage implements OnInit {

  public valoraciones: Array<any>;
  public user: any;

  constructor(
    public loadingController: LoadingController,
    public menuService: MenuService
  ) 
  {
    this.valoraciones = [];
  }

  async ngOnInit() 
  {
    await this.menuService.enableMenu(await this.menuService.getUserRoleFromStorage());
  }

  async ionViewWillEnter()
  {
    const loader = await this.loadingController.create({ message: 'Fetching info, please wait ...'});
    try
    {
      loader.present();

      const vlrcns = await API.get('ERP', '/erp/valoracion', {});
      this.valoraciones = vlrcns;

      for(let i = 0; i < this.valoraciones.length; i++)
      {

        const params = {
          queryStringParameters: {
            key: this.valoraciones[i].informe
          }
        }

        const userParams = {
          queryStringParameters: {
            Username: this.valoraciones[i].sub
          }
        }

        const user = await API.get('ERP', '/erp/getNormalizeUser', userParams);

        const publicLink = await API.get('ERP', '/erp/report', params);

        this.valoraciones[i].publicLink = publicLink;

        this.valoraciones[i].user = user;
      }

      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss()
    }
    finally
    {
      loader.dismiss();
    }
  }

}
