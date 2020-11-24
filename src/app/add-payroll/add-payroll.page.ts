import { Component, OnInit } from '@angular/core';
import { StatResult } from '@capacitor/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

export class Payroll
{
  sub: string;
  startPeriod: Date;
  endDate: Date;
  totalDays: number;
  baseSs: number;
  atDesBase: number;
  irpfBase: number;
  
}

@Component({
  selector: 'app-add-payroll',
  templateUrl: './add-payroll.page.html',
  styleUrls: ['./add-payroll.page.scss'],
})
export class AddPayrollPage implements OnInit {

  public users:Array<any>;
  public conceptos:Array<any>;
  public categorias:Array<any>;

  //Formated array to send 
  public concepts = [];

  //Model attributes
  public sub: string;
  public periodstart: any;
  public periodend: any;
  public totaldays: string;
  public ssbase: string;
  public atdesbase: string;
  public irpf:string;
  public category:string;

  constructor(
    public loadingCtrl: LoadingController,
    public alertController: AlertController
  ) 
  {
    this.users = [];
    this.conceptos = [];
    this.categorias = [];
  }

  newPayroll()
  {
    console.log(
      "sub:" + this.sub +
      "\nperiodstart:" + this.periodstart+
      "\nperiodend:" + this.periodend +
      "\ntotaldays:" + this.totaldays +
      "\nssbase:" + this.ssbase +
      "\natdesbase:" + this.atdesbase +
      "\nirpf:" + this.irpf +
      "\ncategory:" + this.category);
  }


  async selectedConcepts($events)
  {
    let selectedConcepts = $events.detail.value;
    
    //Clear concepts for preventing previous one
    this.concepts = []; 

    for(let concept of selectedConcepts)
    {
      let conceptAttributes = concept.split('+');
      let message: string = conceptAttributes[1] == "DEVENGO" ? "Input price" : "Input percentage";
      
      
      let alert = await this.alertController.create({
        header: conceptAttributes[2],
        message: message,
        inputs: [
          {
            type: 'text',
            name: 'data'
          }
        ],
        buttons: [
          {
            text: 'Add',
            handler: (value) => {
              if(conceptAttributes[1] == "DEVENGO")
              {
                this.concepts.push(
                  {
                    codigo: conceptAttributes[0],
                    tipo: conceptAttributes[1],
                    nombre: conceptAttributes[2],
                    id: conceptAttributes[3],
                    porcentaje: '',
                    precio: value.data
                  });
              }
              else
              {
                this.concepts.push(
                  {
                    codigo: conceptAttributes[0],
                    tipo: conceptAttributes[1],
                    nombre: conceptAttributes[2],
                    id: conceptAttributes[3],
                    porcentaje: value.data,
                    precio: ''
                  });
              }
              
            }
          }
        ]
      });
      await alert.present();
    }

  }

  ngOnInit() {}

  async ionViewWillEnter()
  {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait....'
    });
    await loading.present();
    try
    {
      const ressUser = await API.get('ERP', '/erp/rrhh/listUsers', {
        queryStringParameters: {}
      });

      const ressConcepto = await API.get('ERP', '/erp/concepto', {
        queryStringParameters: {}
      });

      const ressCategoria = await API.get('ERP', '/erp/categorias', {
        queryStringParameters: {}
      });

      this.users = ressUser;
      this.conceptos = ressConcepto;
      this.categorias = ressCategoria;

      loading.dismiss();
    }
    catch(err)
    {
      console.log(err);
    }
  }


}
