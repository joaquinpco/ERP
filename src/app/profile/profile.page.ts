import { Component, OnInit } from '@angular/core';
import { API, Auth } from 'aws-amplify';
import { ActionSheetController } from '@ionic/angular';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  public user: any;
  public imageSrc: string;
  public guestPicture: string;

  constructor(
    private actionSheetController: ActionSheetController,
    public myCameraService: CameraService,
  ) {
    this.user = new Object();
    this.user.normalizeAttr = [];
    this.guestPicture="assets/img/profile.png";
  }

  ngOnInit() {
  }

  addPhotoToProfile() {
    this.myCameraService.takePicture();
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
        text: 'Change profile image',
        icon: 'camera-outline',
        handler: async () => {
          await this.addPhotoToProfile();
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
