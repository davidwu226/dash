import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import {
  CssBaseline,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  Grid,
 } from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import PlayIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import StopIcon from '@material-ui/icons/Stop'
import RestartIcon from '@material-ui/icons/Replay'
import SplitPane from 'react-split-pane'

import './Resizer.css'

import styleMapper from '../util/styleMapper'
import OpModeSelectorContainer from '../containers/OpModeSelectorContainer'
import ConnectivityContainer from '../containers/ConnectivityContainer'
import PingTime from './PingTime'
import Field from './Field'
import NotificationContainer from '../containers/NotificationContainer'
import RealTimeChartContainer from '../containers/RealTimeChartContainer'
import TelemetryTableContainer from '../containers/TelemetryTableContainer'
import { triggerCallbacks } from '../util/resizeEvent'

const drawerWidth = 200
const toolbarHeight = 64

const styles = theme => {
  return ({
    root: {
      display: 'flex',
      flexWrap: 'nowrap',
    },
    growFixed: {
      flexGrow: 1,
      maxWidth: '20px',
    },
    grow: {
      flexGrow: 1,
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 8px',
      height: toolbarHeight,
    },
    version: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 7,
    },
    appBarSpacer: {
      height: toolbarHeight,
      gridColumn: '1/3',
      gridRow: '1/2',
    },
    content: {
//      ...styleMapper(theme.mixins.toolbar, 'minHeight', (r, v) => {
//        r['marginTop'] = `${v}px`
//        r['height'] = `calc(100vh - ${v}px - 2rem)`
//      }),
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: `64px 1fr`,//`${toolbarHeight}px fr auto auto`,
      //...styleMapper(theme.mixins.toolbar, 'minHeight', (r, v) => {
      //  r['gridTemplateRows'] = `${v}px auto`
      //  r['maxHeight'] = `calc(100vh - ${v}px)`
      //  r['height'] = `calc(100vh - ${v}px)`
      //}),
      //gridTemplateRows: `${theme.mixins.toolbar.minHeight}px auto`,
      height: 'calc(100vh - 64px)',
      maxHeight: 'calc(100vh - 64px)',
      //gridGap: theme.spacing.unit * 3,
      //padding: theme.spacing.unit * 3,
      width: `calc(100vw - ${theme.spacing.unit * 7}px)`,
      //  border: '4px solid black',
      //height: '100%',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),

    },
    contentOpen: {
      width: `calc(100vw - ${theme.spacing.unit * 7}px)`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    main: {
      position: 'relative',
      height: 'calc(100vh - 64px)',
      maxHeight: 'calc(100vh - 64px)',
      width: `calc(100vw - ${theme.spacing.unit * 7}px)`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    mainOpen: {
      width: `calc(100vw - ${drawerWidth}px)`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    gridLayout: {
      height: 'calc(100vh - 64px)',
      maxHeight: 'calc(100vh - 64px)',
      width: `calc(100vw - ${theme.spacing.unit * 7}px)`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    gridLayoutOpen: {
      width: `calc(100vw - ${drawerWidth}px)`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    drawerHeadingSpacer: {
      width: '24px',
    },
    cardFullHeight: {
      flex: '1 1 fit-content',
      //justifyContent: 'start',
      //display: 'flex',
//      height: '400px',
width: '100%',
    },
    field: {
      flex: '1 1 auto',
    },
    border: {
      border: '4px solid black',
      width: '100%',
      height: '100%',
    },
    borderBox: {
      flex: '1 1 auto',
      border: '4px solid black',
    },
    statusBarSpacer: {
      minHeight: '2rem',
      border: '3px solid pink',
    },
    statusBar: {
      minHeight: '2rem',
      position: 'fixed',
      bottom: '0px',
      width: '100%',
      zIndex: theme.zIndex.drawer+100,
      backgroundColor: theme.palette.primary.light,
    },
    spacer: {
      flex: '1 1 auto',
      height: '100%',
    },
    grid: {
      gridRow: '2/3',
      gridColumn: '2/3',
      width: 'auto',
      //  height: '100%',
      //  width: '100%',
    },
    appBarSkip: {
      height: toolbarHeight,
      width: '100%',
    }
  })
}

class NavBar extends React.Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    return(
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)} position="absolute">
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, this.state.open && classes.menuButtonHidden)}>
                <MenuIcon />
              </IconButton>
              <Typography component="h1" noWrap variant="h6" color="inherit">
                Tacobots Dashboard
              </Typography>
              <div className={classes.growFixed}/>
              <OpModeSelectorContainer/>
              <div className={classes.grow}/>
              <NotificationContainer/>
              <PingTime pingTime={10}/>
              <ConnectivityContainer/>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" classes={{ paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),}} open={this.state.open}>
            <div className={classes.toolbarIcon}>
              <div className={classes.drawerHeadingSpacer}/>
              <Typography variant="subtitle1" align="center"className={classes.version}>
                Menu
              </Typography>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon/>
              </IconButton>
            </div>
            <Divider/>
            <List>
              <div>
                <ListItem button>
                  <ListItemIcon>
                    <PlayIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Play"/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <PauseIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Pause"/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <StopIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Stop"/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <RestartIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Restart"/>
                </ListItem>
              </div>
            </List>
          </Drawer>
          <main className={classes.main}>
            <div className={classes.appBarSkip}/>
            <SplitPane onChange={()=>triggerCallbacks()} split="vertical" minSize={50} defaultSize={'70%'} className={classNames(classes.gridLayout, this.state.open && classes.gridLayoutOpen)}>
              <Field/>
              <SplitPane onChange={()=>triggerCallbacks()} defaultSize={'50%'} split="horizontal">
                <RealTimeChartContainer style={{ flex: '1 1 auto', display: 'flex' }}/>
                <TelemetryTableContainer/>
              </SplitPane>
            </SplitPane>
          </main>
        </div>
      </React.Fragment>
    )
  }
}

export default connect()(withStyles(styles)(NavBar))
