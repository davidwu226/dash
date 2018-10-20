import React from 'react'
import { connect } from 'react-redux'
import { selectOpMode } from '../state/OpMode'
import OpModeSelector from '../components/OpModeSelector'

class OpModeSelectorContainer extends React.Component {
  render() {
    const { opMode, opModes, ...others } = this.props
    return <OpModeSelector opMode={opMode} opModes={opModes} onChange={(opMode) => this.props.selectOpMode(opMode)} {...others} />
  }
}

function mapStateToProps(state) {
  return {
    opMode: state.OpMode.opMode,
    opModes: state.OpMode.opModes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectOpMode: opMode => dispatch(selectOpMode(opMode)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OpModeSelectorContainer)
