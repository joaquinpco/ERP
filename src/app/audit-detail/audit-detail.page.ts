import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-audit-detail',
  templateUrl: './audit-detail.page.html',
  styleUrls: ['./audit-detail.page.scss'],
})
export class AuditDetailPage implements OnInit {

  public audit: any;

  constructor(private route: ActivatedRoute) 
  { 
    this.route.queryParams.subscribe(params => {
      this.audit = JSON.parse(params['audit']);
      console.log(this.audit);
    });
  }

  ngOnInit() {
  }

  

}
