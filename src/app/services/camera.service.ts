import { Injectable } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  async takePicture(imageSrc: any)
  {
    try
    {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64
      });
      
      let imageUrl = image.webPath;
      imageSrc = imageUrl; 
    }
    catch(err)
    {
      console.log(err);
    }
  }
}
