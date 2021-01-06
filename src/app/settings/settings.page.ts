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
  public language: string

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

    this.storage.get('toggleLanguage').then((result) => {

      this.language = result;
      if(this.language == undefined)
      {
        this.language = 'en';
      }

    });
    
  }

  onLanguageChanged($event)
  {
    const currentLanguage = $event.detail.value
    switch(currentLanguage)
    {
      case "en":
          this.translate.use(currentLanguage);
          this.storage.set("toggleLanguage", currentLanguage);
        break;
      case "es":
          this.translate.use(currentLanguage);
          this.storage.set("toggleLanguage", currentLanguage);
        break;
    }
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
