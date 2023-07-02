import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/grid-view', pathMatch: 'full' },
  { path: 'detail-view', component: DetailViewComponent },
  { path: 'grid-view', component: GridViewComponent },
  // Add more route objects as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
