import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from "./guards/guest.guard";
import { AdminGuard } from "./guards/admin.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./routing/home/home.module')
      .then(module => module.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./routing/auth/auth.module')
      .then(module => module.AuthModule),
    canLoad: [GuestGuard],
    canActivate: [GuestGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./routing/admin/admin.module')
      .then(module => module.AdminModule),
    canLoad: [AdminGuard],
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./routing/not-found/not-found.module')
      .then(module => module.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
