export interface MusicPlayer {
  getAuthToken: Function;
  handleStateChanges: Function;
  setPlayerInfo: Function;
  authToken: string;
  musicPlayer: any;
  device_id: string;
}

export interface PlayerStates {
  paused: boolean;
  track_window: any;
}
