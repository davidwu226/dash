import React from 'react'
import { connect } from 'react-redux'
import { Card } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import FieldCanvas from './FieldCanvas'

const DIMENSIONS = 10//1286

function getDimensions(element) {
  const styles = getComputedStyle(element)
  const width = parseInt(styles.getPropertyValue("width"), 10)
  const height = parseInt(styles.getPropertyValue("height"), 10)
  return { width, height }
}

const styles = theme => {
  return ({
    root: {},
    div: {
      maxHeight: 'calc(100vh - 2rem - 64px)',
      //  flex: '1 1 auto',
      overflow: 'hidden',
      //height: '100%',
      //width: '100%',
    },
    canvas: {
      maxHeight: 'calc(100vh - 2rem - 64px)',
      //position: 'absolute',
      //top: 0,
      //left: 0,
      //zIndex: 0,
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
    //if (nextProps.width !== this.state.width || nextProps.height !== this.state.height) {
      this.setState({
        ...this.state,
        width: nextProps.width,
        height: nextProps.height,
      })
    //}
  }

  resize() {
    let main = this.div
    while (main.id !== 'main') {
      main = main.parentNode
    }

    const { width: pw, height: ph } = getDimensions(main)

    const ps = Math.min(pw, ph)
    this.canvas.width = ps
    this.canvas.height = ps
    this.componentWillReceiveProps({ width: ps, height: ps })
    return

    // Really hacky solution to resize...
    /*
    const cw = this.canvas.width
    const ch = this.canvas.height

    this.canvas.width = 10
    this.canvas.height = 10
    window.resizeTo(window.width, window.height)

    const { width: dw, height: dh } = getDimensions(this.div)
    const ds = Math.min(dw, dh)
    this.canvas.width = ds
    this.canvas.height = ds
    console.log(ds)
    this.componentWillReceiveProps({ width: ds, height: ds })

    return

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
    */
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
      <div className={classNames(classNames, classes.div)} ref={(c) => { this.div = c }} style={{ width: width+'px', height: height+'px', maxWidth: width+'px', maxHeight: height+'px', margin: '0px', }} {...other} >
        <div className={classes.root} width={width} height={height} style={{ width: width+'px', height: height+'px', maxWidth: width+'px', maxHeight: height+'px' }}>
          <canvas id='field' className={classes.canvas} ref={(c) => { this.canvas = c }} width={DIMENSIONS} height={DIMENSIONS} onClick={()=>{this.setState({width: '100', height: '100'})}} />
        </div>
      </div>
    )
  }
}


export default connect()(withStyles(styles)(Field))
