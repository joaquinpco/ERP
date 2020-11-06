import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'list-rrhh',
    loadChildren: () => import('./list-rrhh/list-rrhh.module').then( m => m.ListRRHHPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'add-rrhh',
    loadChildren: () => import('./add-rrhh/add-rrhh.module').then( m => m.AddRrhhPageModule)
  },
  {
    path: 'edit-rrhh',
    loadChildren: () => import('./edit-rrhh/edit-rrhh.module').then( m => m.EditRrhhPageModule)
  },
  {
    path: 'delte-rrhh',
    loadChildren: () => import('./delte-rrhh/delte-rrhh.module').then( m => m.DelteRrhhPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
