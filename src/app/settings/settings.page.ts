import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  constructor(private renderer: Renderer2) {}

  onToggleColorTheme(event)
  {
    if(event.detail.checked)
    {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    }
    else
    {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }

  ngOnInit() 
  {
  
  }

}
