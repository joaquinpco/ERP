import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-payroll',
  templateUrl: './list-payroll.page.html',
  styleUrls: ['./list-payroll.page.scss'],
})

export class ListPayrollPage implements OnInit {

  public payrolls: Array<any>;

  constructor() 
  {
    this.payrolls = [];
  }

  ngOnInit() {
  }

  async ionViewWillEnter()
  {

  }

}
