import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {
  DashboardDataModule,
  AuthGuardServiceGuard,
  AuthDataModule,
} from '@iresa/web-portal-data';
import { MusicSearchModule } from '../music-search/music-search.module';
import { RouterModule, Routes } from '@angular/router';
import { MusicPlayerModule } from '../music-player/music-player.module';
import { SideNavModule } from '../../shared/side-nav';
import { HeaderModule } from '../../shared/header';
import { LoaderModule } from '../../shared/loader';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardServiceGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'album/:albumId',
        pathMatch: 'full',
        loadChildren: () =>
          import('../album-list/album-list.module').then(
            (m) => m.AlbumListModule
          ),
      },
      {
        path: 'artist/:artistId/albums',
        pathMatch: 'full',
        loadChildren: () =>
          import('../album-list/album-list.module').then(
            (m) => m.AlbumListModule
          ),
      },
      {
        path: 'album/:albumId/:trackPos',
        pathMatch: 'full',
        loadChildren: () =>
          import('../album-track-list/album-track-list.module').then(
            (m) => m.AlbumTrackListModule
          ),
      },
      {
        path: 'album/:albumId/tracks',
        pathMatch: 'full',
        loadChildren: () =>
          import('../album-track-list/album-track-list.module').then(
            (m) => m.AlbumTrackListModule
          ),
      },
      {
        path: 'playlist/:playlistId/tracks',
        pathMatch: 'full',
        loadChildren: () =>
          import('../album-track-list/album-track-list.module').then(
            (m) => m.AlbumTrackListModule
          ),
      },
      {
        path: 'playlist-tracks/:playlistId',
        pathMatch: 'full',
        loadChildren: () =>
          import('../playlist-details/playlist-details.module').then(
            (m) => m.PlaylistDetailsModule
          ),
      },
      {
        path: 'queue',
        pathMatch: 'full',
        loadChildren: () =>
          import('../queue/queue.module').then((m) => m.QueueModule),
      },
      {
        path: 'station-details',
        pathMatch: 'full',
        loadChildren: () =>
          import('../station-details/station-details.module').then(
            (m) => m.StationDetailsModule
          ),
      },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SideNavModule,
    DashboardDataModule,
    HeaderModule,
    MusicSearchModule,
    MusicPlayerModule,
    LoaderModule,
    AuthDataModule,
    RouterModule.forChild(routes),
  ],
  providers: [AuthGuardServiceGuard],
})
export class DashboardModule {}
