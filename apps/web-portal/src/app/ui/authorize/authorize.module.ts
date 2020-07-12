import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeComponent } from './authorize.component';
import { RouterModule } from '@angular/router';
import { StationsDataModule } from '@iresa/web-portal-data';
import { LoaderModule } from '../../shared/loader';

@NgModule({
  declarations: [AuthorizeComponent],
  imports: [
    CommonModule,
    LoaderModule,
    StationsDataModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthorizeComponent,
      },
    ]),
  ],
})
export class AuthorizeModule {}
