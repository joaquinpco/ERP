import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class CameraService {
  
  public guestPicture: string

  constructor() {
    this.guestPicture = "assets/img/profile.png";
  }

  async takePicture()
  {
    try {

      //This is for preventing camera ionic library console.error 
      const errorConsoleFunction = console.error;
      console.error = function() {};

      const profilePicture = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
      this.guestPicture = profilePicture.dataUrl;

      console.error = errorConsoleFunction

      return this.guestPicture;
    } catch (error) {
      //console.error(error);
      return error;
    }
  }

}