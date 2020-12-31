import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-add-productcategory',
  templateUrl: './add-productcategory.page.html',
  styleUrls: ['./add-productcategory.page.scss'],
})
export class AddProductcategoryPage implements OnInit {

  public productcategory;


  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router
  ) { }

  async newCategory()
  {
    const loader = await this.loadingController.create({message: 'Submitting new Category'});
    try
    {
      loader.present();

      if(this.productcategory === undefined)
      {
        throw("Product category cannot be empty");
      }

      const bodyParams = {
        body: {
          category: this.productcategory
        }
      }

      await API.post('ERP', '/erp/newProductCategory', bodyParams);

      this.router.navigate(['list-productcategory']);

      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();
      
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: '',
        message: err,
        buttons: ['OK']
      });

      alert.present();
    }
  }

  ngOnInit() {
  }

}
