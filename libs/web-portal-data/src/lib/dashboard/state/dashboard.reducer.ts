import { menuItems } from './config/menu-items';
import { createReducer, on, Action } from '@ngrx/store';
import * as DashboardAction from './dashboard.actions';

export const DASHBOARD_FEATURE_KEY = 'dashboard';

/**
 * Interface for the 'Dashboard' data used in
 *  - DashboardState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

export interface DashboardState {
  useSample: boolean;
  menuItems: any[];
  selectedMenuItems: string;
  logoName: string;
  productName: string;
  searchItems: any[];
  searchLoading: boolean;
  loading: boolean;
}

export interface DashboardPartialState {
  readonly [DASHBOARD_FEATURE_KEY]: DashboardState;
}

export const initialState: DashboardState = {
  useSample: false,
  menuItems: menuItems,
  selectedMenuItems: menuItems[0].value,
  logoName: 'Iresa',
  productName: 'Portal',
  searchItems: [],
  searchLoading: false,
  loading: false,
};

const dashboardReducer = createReducer(
  initialState,
  on(DashboardAction.search, (state, payload) => ({
    ...state,
    searchLoading: true,
  })),
  on(DashboardAction.searchSuccess, (state, payload) => ({
    ...state,
    searchLoading: false,
    searchItems: payload.results,
  })),
  on(DashboardAction.searchError, (state, payload) => ({
    ...state,
    searchLoading: false,
    searchItems: [],
  })),
  on(DashboardAction.setSelectedMenuItems, (state, payload) => ({
    ...state,
    selectedMenuItems: payload.menu,
  })),
  on(DashboardAction.setLoading, (state, payload) => ({
    ...state,
    loading: payload.loading,
  })),
  on(DashboardAction.setUseSample, (state, payload) => ({
    ...state,
    useSample: payload.useSample,
  }))
);

export function reducer(state: DashboardState | undefined, action: Action) {
  return dashboardReducer(state, action);
}
