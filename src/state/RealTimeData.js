const initialState = {
  data: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_DATA':
    return {
      ...state,
      data: [...state.data, action.data],
    }
    default:
    return state
  }
}

export function addData(data) {
  return {
    type: 'ADD_DATA',
    data,
  }
}
