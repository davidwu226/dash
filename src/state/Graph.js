const initialState = {
  startTime: (new Date()).getTime(),
  graphs: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_GRAPH':
    {
      const graphs = { ...state.graphs }
      graphs[action.name] = action.color
      return {
        ...state,
        graphs,
      }
    }
    case 'REMOVE_GRAPH':
    {
      const graphs = { ...state.graphs }
      delete graphs[action.name]
      return {
        ...state,
        graphs,
      }
    }
    case 'CHANGE_GRAPHS':
    {
      return {
        ...state,
        graphs: action.graphs,
      }
    }
    case 'RESET_GRAPH_TIME':
    {
      return {
        ...state,
        startTime: (new Date(action.startTime)).getTime(),
      }
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

export function resetGraphTime(startTime) {
  return {
    type: 'RESET_GRAPH_TIME',
    startTime: ((startTime && new Date(startTime)) || (new Date())).getTime(),
  }
}
