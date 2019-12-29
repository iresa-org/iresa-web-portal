import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FirestoreBuilderService } from '@iresa/firestore';
import { map } from 'rxjs/operators';
import { SpotifyService } from '@iresa/ngx-spotify';
import { playlists } from './playlists';

@Injectable()
export class PlaylistsService {
  constructor(private spotifyService: SpotifyService) {}

  getPlaylists(stationId: string) {
    return of(playlists);
  }

  playlistForm(playlist) {
    let form = {};
    const fields = ['id', 'images', 'name', 'type'];

    fields.forEach(key => {
      if (playlist[key]) {
        form[key] = playlist[key];
      }
    });
    form = FirestoreBuilderService.build(form);
    return form;
  }

  trackForm(track) {
    let form = {};
    const fields = ['id', 'images', 'name', 'uri', 'artists', 'duration_ms'];

    track = { ...track, images: track.album.images.slice(0, 1) };
    fields.forEach(key => {
      if (track[key]) {
        if (key === 'artists') {
          form[key] = this.toArtistNames(track[key]);
        } else {
          form[key] = track[key];
        }
      }
    });
    form = FirestoreBuilderService.build(form);
    return form;
  }

  getPlaylistTracks(stationId, playlist) {
    if (playlist.type === 'favorite') {
      return this.getFavPlaylistTracks(playlist);
    }
    return of(playlist.tracks);
  }

  getFavPlaylistTracks(playlist) {
    return this.spotifyService
      .getPlaylistTracks(playlist.id, { limit: 10 })
      .pipe(
        map(tracks => {
          return tracks.items.map(item => {
            const track = item.track;
            return {
              name: item.track.name,
              id: track.id,
              uri: track.uri,
              images: track.album.images.slice(0, 1),
              artists: this.toArtistNames(track.artists),
              duration_ms: track.duration_ms
            };
          });
        })
      );
  }

  toArtistNames(artists) {
    return artists.map(a => {
      return { name: a.name };
    });
  }
}
