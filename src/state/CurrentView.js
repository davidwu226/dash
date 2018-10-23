const initialState = {
  live: true,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LIVE_MODE':
    {
      return {
        live: true,
      }
    }
    case 'PLAYBACK_MODE': {
      return {
        live: false,
        startTime: action.startTime,
        endTime: action.endTime,
      }
    }
    default:
    return state
  }
}

export function liveMode() {
  return {
    type: 'LIVE_MODE',
  }
}

export function playbackMode(startTime, endTime) {
  return {
    type: 'PLAYBACK_MODE',
    startTime: (new Date(startTime || 0)).getTime(),
    endTime: (new Date(endTime || 0)).getTime(),
  }
}
