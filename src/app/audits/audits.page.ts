import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.page.html',
  styleUrls: ['./audits.page.scss'],
})
export class AuditsPage implements OnInit {

  /* TODO: FINALIZE AUDIT TABLE frontend and backend */

  tablestyle = 'bootstrap';

  public rows = [
    {
      "name": "Ethel Price",
      "gender": "female",
      "age": 22
    },
    {
      "name": "Claudine Neal",
      "gender": "female",
      "age": 55
    },
    {
      "name": "Beryl Rice",
      "gender": "female",
      "age": 67
    },
    {
      "name": "Simon Grimm",
      "gender": "male",
      "age": 28
    }
  ];

  constructor() { }

  ngOnInit() {
    
  }

  async ionViewWillEnter()
  {

  }

}
