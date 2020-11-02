import { Component, OnInit, Renderer2 } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  public tgglCheckValue: boolean;

  constructor(private renderer: Renderer2, private storage: Storage) 
  {
    this.storage.get('toggleCheck').then((result) => {
      this.tgglCheckValue = result;
      
      if(this.tgglCheckValue)
      {
        this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      }
      else
      {
        this.renderer.setAttribute(document.body, 'color-theme', 'light');
      }
    });
  }

  onToggleColorTheme(event)
  {
    if(event.detail.checked)
    {
      this.storage.set('toggleCheck', true);
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    }
    else
    {
      this.storage.set('toggleCheck', false);
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }

  ngOnInit() 
  {
  
  }

}
