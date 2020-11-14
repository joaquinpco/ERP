import { Component, OnInit } from '@angular/core';
import { API, Auth } from 'aws-amplify';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user: any;

  constructor(
    private actionSheetController: ActionSheetController  
  ) {
    this.user = new Object();
    this.user.normalizeAttr = [];
  }

  ngOnInit() {
  }

  async openActionSheet()
  {
    await this.presentActionSheet();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Profile',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Edit First and Last Name',
        icon: 'document-text-outline',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Change profile image from Camera',
        icon: 'camera-outline',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Change profile image from Album',
        icon: 'image-outline',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async ionViewWillEnter()
  {
    try
    {
      const currentUser = await Auth.currentAuthenticatedUser();
      let params = {
        'queryStringParameters' :
        {
          'Username' : currentUser.username
        }
      };
      this.user = await API.get('ERP', '/erp/getNormalizeUser', params)
    }
    catch(err)
    {
      this.user = undefined;
    }
  }

}
