import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [ 
  {
    path: '', component: AppLayoutComponent,
    children: [
      {
        path: 'upload', component: UploadComponent
      },
      {
        path: '', component: UploadComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
