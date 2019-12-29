import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AlbumsFacade, PlaylistsFacade } from '@iresa/web-portal-data';
import { MatDialog } from '@angular/material';
import { PlaylistDialogComponent } from './playlist-dialog/playlist-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'iresa-portal-album-track-list',
  templateUrl: './album-track-list.component.html',
  styleUrls: ['./album-track-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumTrackListComponent implements OnInit {
  showSavePlaylist: boolean;
  selectedIdx: number;
  constructor(
    private albumFacade: AlbumsFacade,
    private playlistFacade: PlaylistsFacade,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onRouteChange();
  }

  onRouteChange() {
    this.route.paramMap.subscribe(params => {
      this.selectedIdx = +this.route.snapshot.params['trackPos'] - 1;
    });
  }

  get albumTracks$() {
    return this.albumFacade.albumTracks$;
  }

  get custPlaylists$() {
    return this.playlistFacade.custPlaylists$;
  }

  playSong(track, album) {
    const data = { ...track, images: album.images };
  }

  savePlaylist(playlist) {
    this.playlistFacade.createPlaylist({ ...playlist, type: 'favorite' });
  }

  addToPlaylist(playlist, track, album) {
    if (!track.album) {
      track = { ...track, album: album, images: album.images };
    }
    this.playlistFacade.addToPlaylist({
      playlistId: playlist.id,
      track
    });
  }

  createPlaylist() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PlaylistDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.trim() !== '') {
        this.playlistFacade.createPlaylist({ name });
      }
    });
  }
}
