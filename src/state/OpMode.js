const initialState = {
  opMode: '',
  opModes: ['OpMode 1', 'OpMode 2', 'OpMode 3'],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_OP_MODE':
    return {
      ...state,
      opMode: action.opMode,
      active: false,
    }
    case 'SET_OP_MODES':
    return {
      ...state,
      opModes: action.opModes,
    }
    default:
    return state
  }
}

export function selectOpMode(opMode) {
  return {
    type: 'SELECT_OP_MODE',
    opMode,
  }
}

export function setOpModes(opModes) {
  return {
    type: 'SET_OP_MODES',
    opModes,
  }
}
