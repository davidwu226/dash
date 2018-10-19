const initialState = {
  pingTime: 10,
  connected: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PING_TIME':
    return {
      ...state,
      pingTime: action.pingTime,
    }
    case 'SET_CONNECTED':
    return {
      ...state,
      connected: action.connected,
    }
    default:
    return state
  }
}

export function setPingTime(pingTime) {
  return {
    type: 'SET_PING_TIME',
    pingTime,
  }
}

export function setConnected(connected) {
  return {
    type: 'SET_CONNECTED',
    connected,
  }
}
