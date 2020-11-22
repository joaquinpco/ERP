import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.page.html',
  styleUrls: ['./list-report.page.scss'],
})
export class ListReportPage implements OnInit {

  public valoraciones: Array<any>;

  constructor() 
  {
    this.valoraciones = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {
    const vlrcns = await API.get('ERP', '/erp/valoracion', {});
    this.valoraciones = vlrcns;
    console.log(this.valoraciones);
  }

}
