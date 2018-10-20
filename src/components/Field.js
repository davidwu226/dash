import React from 'react'
import { connect } from 'react-redux'
import { Card } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import FieldCanvas from './FieldCanvas'

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
      overflow: 'hidden',
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

    window.addEventListener('resize', () => {
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
    let main = this.div
    while (main && main.id !== 'main') {
      main = main.parentNode
    }
    if (main !== this.div.parentNode) {
      const field = main.children.item(1)
      const { width: pw, height: ph } = getDimensions(main)
      const { width: dw, height: dh } = getDimensions(this.div)
      const { width: fw, height: fh } = getDimensions(field)

      const ps = Math.min(Math.min(pw-fw, ph/2))
      if (this.canvas) {
        this.canvas.width = ps
        this.canvas.height = ps
      }
      if (this.props.debug) {
        console.log(`xresize: ${ps} ${dw}x${dh} ${pw}x${ph} ${fw}x${fh}`)
      }
      this.componentWillReceiveProps({ width: ps, height: ps })
      return
    }

    const { width: dw, height: dh } = getDimensions(this.div)
    const { width: pw, height: ph } = getDimensions(main)

    const ps = Math.min(Math.min(pw, dh), ph)
    if (this.canvas) {
      this.canvas.width = ps
      this.canvas.height = ps
    }
    if (this.props.debug) {
      console.log(`resize: ${main.id} ${ps} ${dw}x${dh} ${pw}x${ph}`)
    }
    this.componentWillReceiveProps({ width: ps, height: ps })
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
    const { classes, classnames, ...other } = this.props
    const { width, height } = this.state

    return (
      <div className={classNames(classNames, classes.root)} ref={(c) => { this.div = c }} {...other} >
        {!this.props.debug && <canvas className={classes.canvas} ref={(c) => { this.canvas = c }} width={width} height={height} onClick={()=>{this.setState({width: '100', height: '100'})}} />}
        {this.props.debug && <canvas className={classes.canvas} ref={(c) => { this.canvas = c }} width={width} height={height} onClick={()=>{this.setState({width: '100', height: '100'})}} /*style={{ position: 'absolute', top: '150px', left: '150px' }} *//>}
      </div>
    )
  }
}


export default connect()(withStyles(styles)(Field))
