import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.page.html',
  styleUrls: ['./list-accounts.page.scss'],
})
export class ListAccountsPage implements OnInit {

  public accounts: Array<any>;

  constructor(
    public loaderController: LoadingController
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {
    const loader = await this.loaderController.create({ message: 'Fetching bank accounts, please wait ...' });
    try
    {
      loader.present();
      this.accounts = await API.get('ERP', '/erp/bankAccounts', {});
      loader.dismiss();
    }
    catch(err)
    {
      loader.dismiss();
    }
  }
}
