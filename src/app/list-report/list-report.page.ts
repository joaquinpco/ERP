import { Component, OnInit } from '@angular/core';

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

}
