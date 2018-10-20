import _ from 'lodash'

const callbacks = []

export function registerCallback(cb) {
  callbacks.push(cb)
}

export function triggerCallbacks() {
  _.each(callbacks, cb => cb())
}
