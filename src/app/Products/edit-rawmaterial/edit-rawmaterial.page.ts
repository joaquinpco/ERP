import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-edit-rawmaterial',
  templateUrl: './edit-rawmaterial.page.html',
  styleUrls: ['./edit-rawmaterial.page.scss'],
})
export class EditRawmaterialPage implements OnInit {

  public rawMaterialId: Number;

  public rawMaterial: any;
  public suppliers: Array<any>;

  public name: string;
  public weight: string;
  public quantity: string;
  public supplier: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public loader: LoadingController,
    public route: Router
  ) {
    this.rawMaterialId = this.activatedRoute.snapshot.queryParams.id;
  }

  ngOnInit() {
  }

  async editRawMaterial(id)
  {
    try
    {
      let putParams = {
        body: {
          nombre: this.name,
          peso: this.weight,
          cantidad: this.quantity,
          proveedorId: this.supplier,
          id: id
        }
      }

      let rawMaterial = await API.put('ERP', '/erp/updateRawMaterial', putParams);

      this.route.navigate(['/list-rawmaterials'])
    }
    catch(err)
    {

    }
  }

  async ionViewWillEnter() {

    const loader = await this.loader.create({message: "Fetching info, please wait ..."});

    try
    {
      await loader.present();

      const queryParams = {
        'queryStringParameters': {
          id: this.rawMaterialId,
          queryType: 1
        }
      }

      let rawMaterial = await API.get('ERP', '/erp/rawMaterials', queryParams);
      this.rawMaterial = rawMaterial;
      let suppliers = await API.get('ERP', '/erp/suppliers', {});
      this.suppliers = suppliers;

      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();
    }

  }

}
