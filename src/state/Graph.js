const initialState = {}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_GRAPH':
    {
      const s = { ...state }
      s[action.name] = action.color
      return s
    }
    case 'REMOVE_GRAPH':
    {
      const s = { ...state }
      delete s[action.name]
      return s
    }
    case 'CHANGE_GRAPHS':
    {
      return action.graphs
    }
    default:
    return state
  }
}

export function addGraph(name, color) {
  return {
    type: 'ADD_GRAPH',
    name,
    color,
  }
}

export function removeGraph(name) {
  return {
    type: 'REMOVE_GRAPH',
    name,
  }
}

export function changeGraphs(graphs) {
  return {
    type: 'CHANGE_GRAPHS',
    graphs,
  }
}
