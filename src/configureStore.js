import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './state'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () =>  {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}

export default configureStore
