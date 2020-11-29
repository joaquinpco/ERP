import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  async canActivate(activateRoute: ActivatedRouteSnapshot)
  {
    try
    {
      const currentUser = await Auth.currentAuthenticatedUser();
      return true;
    }
    catch(err)
    {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
