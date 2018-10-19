import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import OpMode from './state/OpMode'
import Network from './state/Network'

const configureStore = () =>  {
  return createStore(combineReducers({
    OpMode,
    Network,
    // Add other reducers here!
  }), applyMiddleware(thunk))
}

export default configureStore
