import React from 'react'
import { connect } from 'react-redux'
import { Card } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import FieldCanvas from './FieldCanvas'

const DIMENSIONS = 1286

const styles = theme => {
  return ({
    root: {},
    canvas: {},
  })
}

class Field extends React.Component {
  constructor(props) {
    super(props);

    this.renderField = this.renderField.bind(this);

    this.state = {
      width: props.width || 10,
      height: props.height || 10,
    }
  }

  componentDidMount() {
    this.field = new FieldCanvas(this.canvas)
    this.renderField()
    this.resize()

    window.addEventListener('resize', () => {
      this.resize()
    })
  }

  componentDidUpdate() {
    this.field.setOverlay(this.props.overlay)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.width !== this.state.width || nextProps.height !== this.state.height) {
      this.setState({
        ...this.state,
        width: nextProps.width,
        height: nextProps.height,
      })
    }
  }

  resize() {
    // Really hacky solution to resize...
    const card = this.canvas.parentNode
    let parent = card
    while (parent.id !== 'desktop') {
      parent = parent.parentNode
    }
    let main = parent
    while (main.id !== 'main') {
      main = main.parentNode
    }
    const styles = getComputedStyle(parent)
    const w = parseInt(styles.getPropertyValue("width"), 10)
    const h = parseInt(styles.getPropertyValue("height"), 10)
    const mstyles = getComputedStyle(main)
    const mw = parseInt(mstyles.getPropertyValue("width"), 10)-56
    const mh = parseInt(mstyles.getPropertyValue("height"), 10)-56
    const s = Math.min(w, mh, DIMENSIONS)
    this.canvas.width = s
    this.canvas.height = s
    this.componentWillReceiveProps({ width: s, height: s })
  }

  renderField() {
    if (this.canvas) {
      const { width, height } = this.state
      this.field.render(0, 0, width, height)
      requestAnimationFrame(this.renderField)
    }
  }

  render() {
    const { classes } = this.props
    const { width, height } = this.state

    return (
        <Card className={classes.root} width={width} height={height} style={{ width: width+'px', height: height+'px' }}>
          <canvas id='field' className={classes.canvas} ref={(c) => { this.canvas = c }} width={10} height={10} />
        </Card>
    )
  }
}


export default connect()(withStyles(styles)(Field))
