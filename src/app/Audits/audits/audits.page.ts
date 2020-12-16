import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.page.html',
  styleUrls: ['./audits.page.scss'],
})
export class AuditsPage implements OnInit {

  /* TODO: FINALIZE AUDIT TABLE frontend and backend */

  tablestyle = 'bootstrap';

  //Data Tests
  public rows = [
    {
      "title": "Employee Added",
      "data": "New Employee",
      "endpoint": "/erp/rrhh/newEmployee",
      "infoFront": "add-rrhh",
      "result": "CREATED",
      "description": "user x storage a new employee"
    },
    {
      "title": "Employee Updated",
      "data": "Edit Employee",
      "endpoint": "/erp/rrhh/newEmployee",
      "infoFront": "edit-rrhh",
      "result": "UPDATED",
      "description": "user x updated y employee"
    }
  ];

  constructor(
    public navController: NavController
  ) { }

  ngOnInit() {
    
  }

  open(row)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          audit: JSON.stringify(row)
      }
    };

    this.navController.navigateForward(['/audit-detail'], navigationExtras);
  }

  async ionViewWillEnter()
  {

  }

}
