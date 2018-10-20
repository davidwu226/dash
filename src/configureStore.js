import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import OpMode from './state/OpMode'
import Network from './state/Network'
import RealTimeData from './state/RealTimeData'

const configureStore = () =>  {
  return createStore(combineReducers({
    OpMode,
    Network,
    RealTimeData,
    // Add other reducers here!
  }), applyMiddleware(thunk))
}

export default configureStore
