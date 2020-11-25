import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlertController, LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

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
    public alertController: AlertController,
    public router: Router,
    private datePipe: DatePipe
  ) 
  {
    var date = Date();
    this.users = [];
    this.conceptos = [];
    this.categorias = [];
    this.periodstart = this.datePipe.transform(date,"yyyy-MM-dd");
    this.periodend = this.datePipe.transform(date,"yyyy-MM-dd");
  }

  async newPayroll()
  {
    const loader = await this.alertController.create({ message: 'Creating payroll' });

    try
    {
      
      loader.present();

      console.log(this.concepts);

      let json = JSON.stringify(this.concepts);
      
    
      let params = {
        body: {
          sub: this.sub,
          periodstart: this.periodstart,
          periodend: this.periodend,
          totaldays: this.totaldays,
          ssbase:this.ssbase,
          atdesbase: this.atdesbase,
          irpf: this.irpf,
          category: this.category,
          concept: json
        }
      }
      await API.post('ERP', '/erp/newPayroll', params);
      loader.dismiss();
      
      this.router.navigate(['/list-payroll']);
    }
    catch(err)
    {
      loader.dismiss();
    }
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

      const params = {
        'queryStringParameters': {
          queryType: 1
        }
      }

      const ressCategoria = await API.get('ERP', '/erp/categorias', params);

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
