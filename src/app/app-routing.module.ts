import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuardService],
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
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Employee/list-rrhh/list-rrhh.module').then( m => m.ListRRHHPageModule)
  },
  {
    path: 'settings',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'add-rrhh',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Employee/add-rrhh/add-rrhh.module').then( m => m.AddRrhhPageModule)
  },
  {
    path: 'edit-rrhh',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Employee/edit-rrhh/edit-rrhh.module').then( m => m.EditRrhhPageModule)
  },
  {
    path: 'delte-rrhh',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Employee/delte-rrhh/delte-rrhh.module').then( m => m.DelteRrhhPageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'add-payroll',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Payrolls/add-payroll/add-payroll.module').then( m => m.AddPayrollPageModule)
  },
  {
    path: 'list-payroll',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Payrolls/list-payroll/list-payroll.module').then( m => m.ListPayrollPageModule)
  },
  {
    path: 'add-report',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Reports/add-report/add-report.module').then( m => m.AddReportPageModule)
  },
  {
    path: 'list-report',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Reports/list-report/list-report.module').then( m => m.ListReportPageModule)
  },
  {
    path: 'admin-add-concepts',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Payrolls/admin-add-concepts/admin-add-concepts.module').then( m => m.AdminAddConceptsPageModule)
  },
  {
    path: 'admin-list-concepts',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Payrolls/admin-list-concepts/admin-list-concepts.module').then( m => m.AdminListConceptsPageModule)
  },
  {
    path: 'admin-add-category',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Payrolls/admin-add-category/admin-add-category.module').then( m => m.AdminAddCategoryPageModule)
  },
  {
    path: 'admin-list-category',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Payrolls/admin-list-category/admin-list-category.module').then( m => m.AdminListCategoryPageModule)
  },
  {
    path: 'audits',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Audits/audits/audits.module').then( m => m.AuditsPageModule)
  },
  {
    path: 'add-customers',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Customers/add-customers/add-customers.module').then( m => m.AddCustomersPageModule)
  },
  {
    path: 'edit-customers',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Customers/edit-customers/edit-customers.module').then( m => m.EditCustomersPageModule)
  },
  {
    path: 'list-customers',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Customers/list-customers/list-customers.module').then( m => m.ListCustomersPageModule)
  },
  {
    path: 'audit-detail',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Audits/audit-detail/audit-detail.module').then( m => m.AuditDetailPageModule)
  },
  {
    path: 'add-product',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Products/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'list-product',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Products/list-product/list-product.module').then( m => m.ListProductPageModule)
  },
  {
    path: 'sell-product',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Products/sell-product/sell-product.module').then( m => m.SellProductPageModule)
  },
  {
    path: 'add-productcategory',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Products/add-productcategory/add-productcategory.module').then( m => m.AddProductcategoryPageModule)
  },
  {
    path: 'list-productcategory',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./Products/list-productcategory/list-productcategory.module').then( m => m.ListProductcategoryPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
