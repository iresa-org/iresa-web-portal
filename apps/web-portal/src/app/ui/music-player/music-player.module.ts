import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './music-player.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadImageModule, ScriptLoaderModule } from '@iresa/shared/utilities';
import { PlaylistDataModule, WebPlaybackDataModule } from '@iresa/web-portal-data';
import { VolClassPipe } from './vol-class.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MusicPlayerComponent, VolClassPipe],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    FlexLayoutModule,
    LoadImageModule,
    ScriptLoaderModule,
    PlaylistDataModule,
    MatTooltipModule,
    RouterModule,
    WebPlaybackDataModule
  ],
  exports: [MusicPlayerComponent]
})
export class MusicPlayerModule {}
