import { Component, OnInit } from '@angular/core';
import { API, Auth, loadingOverlay } from 'aws-amplify';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
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
    public alertController: AlertController,
    public loadingController: LoadingController
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
        handler: async () => {

          const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Update first and last Name',
              inputs: [
                {
                  name: 'first_name',
                  type: 'text',
                  value: this.user.normalizeAttr['custom:FIRST_NAME']
                },
                {
                  name: 'last_name',
                  type: 'text',
                  label: 'Last Name',
                  value: this.user.normalizeAttr['custom:LAST_NAME']
                },
              ],
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Confirm Cancel');
                  }
                }, {
                  text: 'Update',
                  handler: () => {
                    console.log('Confirm Ok');
                  }
                }
              ]
            });
          
          alert.present();
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
    const loader = await this.loadingController.create({message: 'Please, wait ...'});
    try
    {  
      loader.present();

      const currentUser = await Auth.currentAuthenticatedUser();
      let params = {
        'queryStringParameters' :
        {
          'Username' : currentUser.username
        }
      };
      this.user = await API.get('ERP', '/erp/getNormalizeUser', params)

      loader.dismiss();
    }
    catch(err)
    {
      this.user = undefined;
      loader.dismiss();
    }
    finally
    {
      loader.dismiss();
    }
  }

}
