import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { DashboardPartialState } from './dashboard.reducer';
import { dashboardQuery } from './dashboard.selectors';
import * as DashboardAction from './dashboard.actions';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  menuItems$ = this.store.pipe(select(dashboardQuery.getMenuItems));
  product$ = this.store.pipe(select(dashboardQuery.getProduct));
  searchResults$ = this.store.pipe(select(dashboardQuery.getSearchResults));
  loading$ = this.store.pipe(select(dashboardQuery.getLoading));

  constructor(private store: Store<DashboardPartialState>) {}

  search(search) {
    this.store.dispatch(DashboardAction.search({ search }));
  }

  setSelectedMenuItems(menu) {
    this.store.dispatch(DashboardAction.setSelectedMenuItems({ menu }));
  }

  setLoading(loading) {
    this.store.dispatch(DashboardAction.setLoading({ loading }));
  }

  getAlbumFromSearch(albumId) {
    return this.store.pipe(
      select(dashboardQuery.getAlbumFromSearch, { albumId })
    );
  }
}
