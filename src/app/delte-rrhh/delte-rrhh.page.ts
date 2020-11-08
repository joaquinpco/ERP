import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API } from 'aws-amplify';

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

  async disableUser(sub)
  {
    try
    {
      let params = {
        'queryStringParameters' :
        {
          'sub' : this.sub
        }
      };

      await API.put('ERP', '/erp/rrhh/disableUser', params);
    }
    catch(err)
    {
      this.router.navigate(['list-rrhh']);
    }
  }

}
