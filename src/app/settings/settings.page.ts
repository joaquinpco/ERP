import { Component, OnInit, Renderer2 } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuService } from '../services/menu.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  public tgglCheckValue: boolean;

  constructor(
    private renderer: Renderer2, 
    private storage: Storage,
    public menuService: MenuService,
    public translate: TranslateService
    ) 
  {
    
    this.storage.get('toggleCheck').then((result) => {
      
      this.tgglCheckValue = result;
      if(this.tgglCheckValue == undefined)
      {
      this.tgglCheckValue = false;
      }

    });
    
  }

  onToggleColorTheme(event)
  {
    if(event.detail.checked)
    {
      this.tgglCheckValue = true;
      this.storage.set('toggleCheck', true);
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    }
    else
    {
      this.tgglCheckValue = false;
      this.storage.set('toggleCheck', false);
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }

  async ngOnInit() 
  {
    await this.menuService.enableMenu(await this.menuService.getUserRoleFromStorage());
  }

}
