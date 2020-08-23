import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '@iresa/ngx-spotify';
import { StationsFacade } from '@iresa/web-portal-data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'iresa-portal-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizeComponent implements OnInit {
  fragmentChange$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stationsFacade: StationsFacade,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.fragmentChange$ = this.route.fragment.pipe(
      tap((fragment) => this.onFragmentChange(fragment))
    );
  }

  onFragmentChange(fragment) {
    const paramsMap = {};
    if (fragment === null) {
      this.router.navigateByUrl('/');
    } else {
      const params = fragment.split('&');
      const props = params.map((paramString) => paramString.split('='));
      props.forEach((propTuple) => {
        paramsMap[propTuple[0]] = propTuple[1];
      });

      this.spotifyService.setAuthToken(paramsMap);
      const state = this.parseState(paramsMap['state']);
      this.stationsFacade.setSelectedId(state.stationId);
      this.router.navigateByUrl('/home');
    }
  }

  parseState = (val) => {
    return JSON.parse(val);
  };
}
