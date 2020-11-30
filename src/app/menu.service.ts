import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuList : Array<string>;

  constructor(private menuCtrl : MenuController)
  {
    this.menuList = [
      'admin-menu',
      'no-admin-menu'
    ];
  }

  enableMenu(userRole : string) : any
  {
    for(const menu of this.menuList)
    {
      this.menuCtrl.enable(false, menu);
    }

    if(userRole === 'ADMIN')
        this.menuCtrl.enable(true, "admin-menu"); // menu-admin me lo estoy inventando
    else if(userRole === 'NO_ADMIN')
      this.menuCtrl.enable(true, "no-admin-menu"); // menu-admin me lo estoy inventando
  }
}
