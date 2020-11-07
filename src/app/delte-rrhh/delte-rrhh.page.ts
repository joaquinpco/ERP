import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delte-rrhh',
  templateUrl: './delte-rrhh.page.html',
  styleUrls: ['./delte-rrhh.page.scss'],
})
export class DelteRrhhPage implements OnInit {

  public sub : string;

  constructor(
                private activatedRoute : ActivatedRoute,
                private router : Router
             ) 
  { 
    this.sub = this.activatedRoute.snapshot.queryParams.sub;
  }

  ngOnInit() {
  }

}
