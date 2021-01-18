import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-add-bankaccount',
  templateUrl: './add-bankaccount.page.html',
  styleUrls: ['./add-bankaccount.page.scss'],
})
export class AddBankaccountPage implements OnInit {

  public iban: string;

  constructor(
    public alertController: AlertController,
    public route: Router
  ) { }

  ngOnInit() {
  }

  async newCategory()
  {
    try
    {
      if(this.iban === undefined)
      {
        throw("IBAN is empty!");
      }
      else
      {
        const regex = /([A-Z]{2})\s*\t*(\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d\d\d)\s*\t*(\d\d)\s*\t*(\d\d\d\d\d\d\d\d\d\d)/

        if(!this.iban.match(regex))
        {
          throw("IBAN format is not well defined!");
        }
        const postParams = {
          body: {
            IBAN: this.iban
          }
        }
        const bankAccount = await API.post('ERP', '/erp/newBankAccount', postParams);

        this.route.navigate(['list-accounts']);
      }
    }
    catch(err)
    {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: '',
        message: err,
        buttons: ['OK']
      });
      alert.present()
    }
  }

}
