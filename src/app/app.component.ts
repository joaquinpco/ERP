import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent{

  public language;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    public storage: Storage
  ) 
  {
    this.storage.get('toggleLanguage').then((result) => {

      this.language = result;
      if(this.language == undefined)
      {
        this.language = 'en';
        translate.use(this.language);
      }
      else
      {
        translate.use(this.language);
      }

    });
    this.initializeApp();
  }

  async ngOnInit()
  {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
