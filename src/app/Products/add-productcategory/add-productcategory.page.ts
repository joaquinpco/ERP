import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
    public router: Router
  ) { }

  async newCategory()
  {
    const loader = await this.loadingController.create({message: 'Submitting new Category'});
    try
    {
      loader.present();

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
    }
  }

  ngOnInit() {
  }

}
