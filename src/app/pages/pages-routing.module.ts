import { AuthGuard } from './../core/guards/auth.guard';
import { NotAuthGuard } from './../core/guards/not-auth.guard';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { LayoutComponent } from "../layouts/layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: '',
    canActivateChild: [NotAuthGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children : [
      {
        path: 'series',
        loadChildren: () => import('./series/series.module').then(m => m.SeriesModule)
      }
    ]
  },

  {
    path: '**',
    loadChildren: () =>import('./errors/404/error-404.module').then(m => m.Error404Module)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', paramsInheritanceStrategy: 'always'})],
  exports: [RouterModule]
})
export class PageRoutingModule {}
