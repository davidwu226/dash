import _ from 'lodash'
import CurrentView from './CurrentView'
import Message from './Message'
import Network from './Network'
import OpMode from './OpMode'
import Graph from './Graph'
import Telemetry from './Telemetry'

const rootReducer = (state = undefined, action) => {
  return _.mapValues({
    CurrentView,
    Message,
    Network,
    OpMode,
    Graph,
    Telemetry,
    // Insert other reducers here!
  }, (f, k) => (f(state && state[k], action, state)))
}

export default rootReducer
