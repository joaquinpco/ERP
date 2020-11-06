import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit-rrhh',
  templateUrl: './edit-rrhh.page.html',
  styleUrls: ['./edit-rrhh.page.scss'],
})
export class EditRrhhPage implements OnInit {

  public sub : string;

  constructor(
                private activatedRoute : ActivatedRoute,
                private router : Router
             ) 
  { 

    this.sub = this.activatedRoute.snapshot.queryParams.sub;
    console.log(this.activatedRoute.snapshot);
    console.log(this.router.getCurrentNavigation().extras);
    if(this.sub)
    {
      console.log(this.sub);
    }
  }

  ngOnInit() 
  {
    
  }

}
