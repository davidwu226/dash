import _ from 'lodash'

const initialState = {
  view: {
    messages: [],
    latest: undefined,
  },
  messages: [],
}

export default function reducer(state = initialState, action, globalState) {
  switch (action.type) {
    case 'NEW_MESSAGE':
    {
      const message = {
        message: action.message,
        variant: action.variant,
        time: action.time,
      }

      const messages = [...state.messages, message]
      const view = (globalState.CurrentView.live && { messages, latest: message }) || state.view
      return {
        view,
        messages,
      }
    }
    case 'PLAYBACK_MODE':
    {
      const { startTime, endTime } = action
      const messages = _.filter(state.messages, (m) => ((m.time >  startTime) && (m.time <= endTime)))
      return {
        ...state,
        view: {
          messages,
          latest: _.last(messages),
        },
      }
    }
    case 'LIVE_MODE':
    {
      const messages = state.messages
      return {
        ...state,
        view: {
          messages,
          latest: _.last(messages),
        },
      }
    }
    default:
    return {
      ...state,
      view: {
        ...state.view,
        latest: undefined,
      },
    }
  }
}

export function addMessage(message, variant = 'default') {
  return {
    type: 'NEW_MESSAGE',
    message,
    variant,
    time: (new Date()).getTime(),
  }
}
