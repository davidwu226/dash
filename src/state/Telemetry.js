import _ from 'lodash'

const initialState = {
  view: {
    telemetry: {}
  },
  telemetry: {},
}

export default function reducer(state = initialState, action, globalState) {
  switch (action.type) {
    case 'NEW_TELEMETRY':
    {
      const value = {
        name: action.name,
        value: action.value,
        time: action.time,
      }

      const telemetry = { ...state.telemetry, [value.name]: [...(state.telemetry[value.name] || []), value] }
      const view = (globalState.CurrentView.live && { telemetry: { ...state.view.telemetry, [value.name]: value } }) || state.view
      return {
        view,
        telemetry,
      }
    }
    case 'PLAYBACK_MODE':
    {
      const { endTime } = action
      const telemetry = _.mapValues(state.telemetry, (d) => {
        // If not found, index will be negative which will return undefined
        const e = d[_.findIndex(d, (d) => d.time > endTime) - 1]
        return e && e.value
      })
      return {
        ...state,
        view: {
          telemetry,
        },
      }
    }
    case 'LIVE_MODE':
    {
      const telemetry = _.mapValues(state.telemetry, (d) => (d[d.length-1].value))
      return {
        ...state,
        view: {
          telemetry,
        },
      }
    }
    default:
    return state
  }
}

export function addTelemetry(name, value) {
  return {
    type: 'NEW_TELEMETRY',
    name,
    value,
    time: (new Date()).getTime(),
  }
}
