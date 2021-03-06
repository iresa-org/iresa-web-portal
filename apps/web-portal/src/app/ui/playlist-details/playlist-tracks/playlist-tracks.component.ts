import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { PlaylistsFacade, WebPlaybackFacade } from '@iresa/web-portal-data';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'iresa-portal-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistTracksComponent implements OnInit {
  constructor(
    private playlistService: PlaylistsFacade,
    private wp: WebPlaybackFacade
  ) {}

  @Input()
  set playlist(value) {
    this._playlist = value;
    if (value) {
      this._tracks = value.tracks;
      this.loadDataSource(value.tracks);
    }
  }

  displayedColumns: string[] = ['select', 'name', 'artists', 'duration_ms'];
  showActionCol = false;
  _tracks: any[];
  _dataSource = new BehaviorSubject<any[]>([]);
  _playlist: { tracks: any[]; type: string; id: string };

  ngOnInit() {
    if (this._playlist.type !== 'favorite') {
      this.displayActionCol();
    }
  }

  get dataSource$() {
    return this._dataSource.asObservable();
  }

  displayActionCol() {
    this.showActionCol = true;
    this.displayedColumns.push('action');
  }

  playSong(index) {
    this.wp.play([this._tracks[index].uri]);
  }

  delete(index) {
    this.playlistService.deletePlaylistTrack({
      playlistId: this._playlist.id,
      position: index
    });
  }

  loadDataSource(value) {
    if (value.length > 0) {
      const ds = value.map(item => {
        const data = {};
        this.displayedColumns.forEach(col => {
          if (item[col]) {
            data[col] = item[col];
          }
        });
        return data;
      });
      this._dataSource.next(ds);
    } else {
      this._dataSource.next([]);
    }
  }
}
