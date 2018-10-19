import _ from 'lodash'

export default function styleMapper(style, srcField, transform) {
  return _.transform(style, (result, value, key) => {
    if (key !== srcField) {
      result[key] = _.isObject(value) ? styleMapper(value, srcField, transform) : value
    } else {
      transform(result, value)
    }
  }, {})
}
