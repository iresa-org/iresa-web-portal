import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { SpotifyService } from '@iresa/ngx-spotify';
import { StationsFacade } from '@iresa/web-portal-data';

@Component({
  selector: 'iresa-portal-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizeComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stationsFacade: StationsFacade,
    private spotifyService: SpotifyService
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    const paramsMap = {};
    this.subs.add(
      this.route.fragment.subscribe(fragment => {
        if (fragment === null) {
          this.router.navigateByUrl('/');
        } else {
          const params = fragment.split('&');
          const props = params.map(paramString => paramString.split('='));
          props.forEach(propTuple => {
            paramsMap[propTuple[0]] = propTuple[1];
          });

          this.spotifyService.setAuthToken(paramsMap);
          const state = this.parseState(paramsMap['state']);
          this.stationsFacade.setSelectedId(state.stationId);
          this.router.navigateByUrl('/home');
        }
      })
    );
  }

  parseState = val => {
    return JSON.parse(val);
  };
}
