import React from 'react'
import { connect } from 'react-redux'
import { Card } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import FieldCanvas from './FieldCanvas'
import { registerCallback } from '../util/resizeEvent'

const DIMENSIONS = 1286

function getDimensions(element) {
  const styles = getComputedStyle(element)
  const width = parseInt(styles.getPropertyValue("width"), 10)
  const height = parseInt(styles.getPropertyValue("height"), 10)
  return { width, height }
}

const styles = theme => {
  return ({
    root: {
    },
    canvas: {
      //position: 'absolute'
    },
  })
}

class Field extends React.Component {
  constructor(props) {
    super(props);

    this.renderField = this.renderField.bind(this);

    this.state = {
      width: props.width || DIMENSIONS,
      height: props.height ||DIMENSIONS,
    }
  }

  componentDidMount() {
    if (this.canvas) {
      this.field = new FieldCanvas(this.canvas)
      this.renderField()
    }
    this.resize()

    this.div.addEventListener('resize', () => {
      this.resize()
    })

    registerCallback(() => {
      this.resize()
    })
  }

  componentDidUpdate() {
    if (this.field) {
      this.field.setOverlay(this.props.overlay)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      width: nextProps.width || this.state.width,
      height: nextProps.height || this.state.height,
    })
  }

  resize() {
    const { width: dw, height: dh } = getDimensions(this.div)
    const s = Math.min(dw, dh)
    if (this.canvas) {
      this.canvas.width = s
      this.canvas.height = s
    }
    console.log(`resizing with ${s} ${dw}x${dh}`)
    this.componentWillReceiveProps({ width: s, height: s })
    return
  }

  renderField() {
    if (this.canvas) {
      const { width, height } = this.state
      this.field.render(0, 0, width, height)
      requestAnimationFrame(this.renderField)
    }
  }

  render() {
    const { classes, className, style, key, ...other } = this.props
    const { width, height } = this.state

    return (
      <div className={className} style={{ display: 'block', width: '100%', height: '100%' }}>
        <div className={classes.root} ref={(c) => { this.div = c }} style={{ position: 'relative', width: '100%', height: '100%' }}>
          <canvas className={classes.canvas} ref={(c) => { this.canvas = c }} width={width} height={height} style={{ position: 'absolute', top: '0', left: '0' }} />
        </div>
      </div>
    )
  }
}

export default connect()(withStyles(styles)(Field))
