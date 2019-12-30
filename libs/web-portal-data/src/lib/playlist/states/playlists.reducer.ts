import { PlaylistsAction, PlaylistsActionTypes } from './playlists.actions';

export const PLAYLISTS_FEATURE_KEY = 'playlists';

/**
 * Interface for the 'Playlists' data used in
 *  - PlaylistsState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

export interface PlaylistsState {
  list: any[]; // list of Playlists; analogous to a sql normalized table
  selectedId?: string | number; // which Playlists record has been selected
  prevIdx: number;
  loaded: boolean; // has the Playlists list been loaded
  error?: any; // last none error (if any),
  tracksLoaded: boolean;
}

export interface PlaylistsPartialState {
  readonly [PLAYLISTS_FEATURE_KEY]: PlaylistsState;
}

export const initialState: PlaylistsState = {
  list: [],
  prevIdx: -1,
  loaded: false,
  tracksLoaded: false
};

export function reducer(
  state: PlaylistsState = initialState,
  action: PlaylistsAction
): PlaylistsState {
  switch (action.type) {
    case PlaylistsActionTypes.PlaylistsLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
    case PlaylistsActionTypes.GetPlaylistTracks: {
      state = {
        ...state,
        list: state.list.map(item =>
          item.id === action.payload.id ? { ...item, tracks: null } : item
        ),
        tracksLoaded: false
      };
      break;
    }
    case PlaylistsActionTypes.GetPlaylistTracksSuccess: {
      state = {
        ...state,
        list: state.list.map(item =>
          item.id === action.payload.id
            ? { ...item, tracks: action.payload.tracks }
            : item
        ),
        tracksLoaded: true
      };
      break;
    }
    case PlaylistsActionTypes.DeletePlaylistTrack: {
      state = {
        ...state,
        list: state.list.map(item =>
          item.id === action.payload.playlistId
            ? {
                ...item,
                tracks: item.tracks.filter(
                  (_, i) => i !== action.payload.position
                )
              }
            : item
        )
      };
      break;
    }
    case PlaylistsActionTypes.AddToPlaylist: {
      state = {
        ...state,
        list: state.list.map(item =>
          item.id === action.payload.playlistId
            ? { ...item, tracks: [...item.tracks, action.payload.track] }
            : item
        )
      };
      break;
    }
    case PlaylistsActionTypes.CreatePlaylistSuccess: {
      state = {
        ...state,
        list: [...state.list, action.payload]
      };
      break;
    }
  }
  return state;
}
