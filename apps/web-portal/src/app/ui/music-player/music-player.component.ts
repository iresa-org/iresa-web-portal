import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgZone,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { WindowRef, ScriptLoaderService } from '@iresa/shared/utilities';
import { SpotifyService } from '@iresa/ngx-spotify';
import { MusicPlayer, PlayerStates } from './music-player.config';
import { WebPlaybackFacade, DashboardFacade } from '@iresa/web-portal-data';
import { skip, tap } from 'rxjs/operators';
import { MatSliderChange } from '@angular/material/slider';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

declare var Spotify: any;

@Component({
  selector: 'iresa-portal-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  private musicPlayerCtrl: MusicPlayer;

  manTogglePlay = false;
  volChange$: Observable<number>;

  constructor(
    private winRef: WindowRef,
    private spotifyService: SpotifyService,
    private ngZone: NgZone,
    private slService: ScriptLoaderService,
    private wpFacade: WebPlaybackFacade,
    private router: Router,
    private dbFacade: DashboardFacade
  ) {}

  get currPlaying$() {
    return this.wpFacade.currTrack$;
  }

  get playingState$() {
    return this.wpFacade.playing$;
  }

  get vol$() {
    return this.wpFacade.vol$;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.ngOnDestroy();
  }

  ngOnInit() {
    this.initOutSideFn();
    this.onSpotifyReady();
    this.loadScript();
    this.onVolChange();
  }

  onVolChange() {
    this.volChange$ = this.vol$
      .pipe(skip(1))
      .pipe(tap((val) => this.musicPlayerCtrl.musicPlayer.setVolume(val)));
  }

  loadScript() {
    this.slService
      .load({
        src: 'https://sdk.scdn.co/spotify-player.js',
        name: 'spotify-player.js',
        loaded: false,
      })
      .subscribe();
  }

  openQueue() {
    this.dbFacade.setSelectedMenuItems('/queue');
    this.router.navigateByUrl('/queue');
  }

  ngOnDestroy() {
    this.disconnectPlayer();
    this.winRef.nativeWindow.MusicPlayer = null;
  }

  disconnectPlayer() {
    this.musicPlayerCtrl.musicPlayer.removeListener('initialization_error');
    this.musicPlayerCtrl.musicPlayer.removeListener('authentication_error');
    this.musicPlayerCtrl.musicPlayer.removeListener('account_error');
    this.musicPlayerCtrl.musicPlayer.removeListener('playback_error');
    this.musicPlayerCtrl.musicPlayer.removeListener('player_state_changed');
    this.musicPlayerCtrl.musicPlayer.removeListener('ready');
    this.musicPlayerCtrl.musicPlayer.removeListener('not_ready');
    this.musicPlayerCtrl.musicPlayer.disconnect();
  }

  initOutSideFn() {
    this.winRef.nativeWindow.MusicPlayer =
      this.winRef.nativeWindow.MusicPlayer || {};
    this.musicPlayerCtrl = this.winRef.nativeWindow.MusicPlayer;
    this.musicPlayerCtrl.getAuthToken = this.getAuthToken;
    this.musicPlayerCtrl.handleStateChanges = this.handleStateChanges;
    this.musicPlayerCtrl.setPlayerInfo = this.setPlayerInfo;
  }

  getAuthToken = () => {
    this.musicPlayerCtrl.authToken = this.ngZone.run(() =>
      this.spotifyService.getAuthToken()
    );
  };

  toggleMute() {
    this.wpFacade.toggleMute();
  }

  handleStateChanges = (states: PlayerStates) => {
    this.ngZone.run(() => {
      if (states.paused !== undefined) {
        this.wpFacade.setPlaying(!states.paused);
      }
      if (states.track_window !== undefined) {
        this.wpFacade.setTrackWindow(states.track_window);
      }
    });
  };

  setPlayerInfo = (data) => {
    this.ngZone.run(() => {
      const authToken = this.musicPlayerCtrl.authToken;
      const device_id = this.musicPlayerCtrl.device_id;
      this.wpFacade.setPlayerInfo({ authToken, device_id });
    });
  };

  onSliderChange(e: MatSliderChange) {
    this.wpFacade.setVol(e.value);
  }

  togglePlay() {
    this.manTogglePlay = !this.manTogglePlay;
    this.musicPlayerCtrl.musicPlayer.togglePlay();
  }

  prev() {
    this.musicPlayerCtrl.musicPlayer.previousTrack();
  }

  next() {
    this.musicPlayerCtrl.musicPlayer.nextTrack();
  }

  onSpotifyReady() {
    this.winRef.nativeWindow.onSpotifyPlayerAPIReady = () => {
      window['MusicPlayer'].getAuthToken();
      const token = window['MusicPlayer'].authToken;
      const player = new Spotify.Player({
        name: 'Iresa Web Playback',
        getOAuthToken: (cb) => {
          cb(token);
        },
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('playback_error', ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener('player_state_changed', (state) => {
        // console.log(state);
        window['MusicPlayer'].handleStateChanges(state);
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        window['MusicPlayer'].musicPlayer = player;
        window['MusicPlayer'].device_id = device_id;
        window['MusicPlayer'].setPlayerInfo();
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
    };
  }
}
