import { Component, OnInit } from '@angular/core';

export class Signupuser
{
  username: String;
  firstname: String;
  lastname: String;
  password: String;
};

@Component({
  selector: 'app-add-rrhh',
  templateUrl: './add-rrhh.page.html',
  styleUrls: ['./add-rrhh.page.scss'],
})

export class AddRrhhPage implements OnInit {

  public signupuser: Signupuser;

  constructor() 
  { 
    this.signupuser = new Signupuser();
  }

  

  ngOnInit() {
  }

  async signup()
  {
  }

}
