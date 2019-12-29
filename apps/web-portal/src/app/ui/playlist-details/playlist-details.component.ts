import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PlaylistsFacade } from '@iresa/web-portal-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'iresa-portal-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistDetailsComponent implements OnInit {
  constructor(
    private playlistFacade: PlaylistsFacade,
    private route: ActivatedRoute
  ) {}

  playlist$;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('playlistId');
    this.playlist$ = this.playlistFacade.getPlaylist(id);
  }
}
