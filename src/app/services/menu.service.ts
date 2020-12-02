import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menuRoles: Array<string>;

  constructor(
    public menuController: MenuController,
    private storage: Storage
  ) 
  { 
    this.menuRoles = [
                      'menu-admin', 
                      'menu-rrhh', 
                      'menu-purchasing', 
                      'menu-finances',
                      'menu-sales',
                      'menu-guest'
                    ];
  }

  async close()
  {
    await this.menuController.close();
  }

  async getUserRoleFromStorage()
  {
    try
    {
      return await this.storage.get('role');
    }
    catch
    {
      return "GUEST";
    }
  }

  async enableMenu(userRole: string)
  {
    //Por defecto todos los menus desactivados

    if(userRole === "ADMIN")
    {
      await this.menuController.enable(true, 'menu-admin');
    }
    else
    {
      if(userRole === "RRHH")
      {
        await this.menuController.enable(true, 'menu-rrhh');
      }
      else if(userRole === "PURCHASING")
      {
        await this.menuController.enable(true, 'menu-purchasing');
      }
      else if(userRole === "FINANCES")
      {
        await this.menuController.enable(true, 'menu-finances');
      }
      else if(userRole === "SALES")
      {
        await this.menuController.enable(true, 'menu-sales');
      }
      else
      {
        await this.menuController.enable(true, 'menu-guest');
      }
    }
  }
}
