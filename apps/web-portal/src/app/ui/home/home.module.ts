import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { PlaylistDataModule, PlaylistResolver } from '@iresa/web-portal-data';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PlaylistComponent } from './playlist/playlist.component';
import { LoadImageModule } from '@iresa/shared/utilities';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [HomeComponent, PlaylistComponent],
  imports: [
    CommonModule,
    PlaylistDataModule,
    MatDividerModule,
    MatBadgeModule,
    MatCardModule,
    LoadImageModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        resolve: { data: PlaylistResolver },
        component: HomeComponent
      }
    ])
  ],
  providers: [PlaylistResolver],
  exports: [PlaylistComponent]
})
export class HomeModule {}
