const STORE_SONG_DETAILS = 'STORE_SONG_DETAILS';
const SAVE_VIDEO_PATH = 'SAVE_VIDEO_PATH';

const initialState = {
  songDownloadUrl: '',
  songName: '',
  videoPathOnDevice: ''
}

export function storeSongDetails(song) {
  return {
    type: STORE_SONG_DETAILS,
    song
  }
}

export function saveVideoPath(path) {
  return {
    type: SAVE_VIDEO_PATH,
    path
  }
}

export default function uploads(state = initialState, action) {
  switch(action.type) {
    case STORE_SONG_DETAILS :
      return {
        ...state,
        songDownloadUrl: action.song.downloadURL,
        songName: action.song.songName
      }
    case SAVE_VIDEO_PATH :
      console.log(action.path)
      return {
        ...state,
        path: action.path
      }
    default :
      return state
  }
}
