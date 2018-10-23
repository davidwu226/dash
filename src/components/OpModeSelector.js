import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core/'

const styles = theme => ({
  root: {
    minWidth: 200,
    marginTop: '-10px',
  },
  inputLabel: {
    color: theme.palette.primary.light,
    '&$inputLabelFocused': {
      color: theme.palette.primary.light,
    },
  },
  inputLabelFocused: {
  },
  icon: {
    fill: theme.palette.primary.light,
  },
  select: {
    color: 'yellow',
    '&:before': {
      borderColor: theme.palette.primary.light,
    },
    '&:after': {
      borderColor: theme.palette.primary.light,
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderColor: `${theme.palette.primary.light}`,
    },

  },
  disabled: {},
  focused: {},
  error: {},
})

class OpModeSelector extends React.Component {
  render() {
    const { classes, onChange, opMode, opModes } = this.props;
    return(
      <div>
        <FormControl className={classes.root}>
          <InputLabel FormLabelClasses={{ root: classes.inputLabel, focused: classes.inputLabelFocused }}>OpMode</InputLabel>
          <Select value={opMode || ''} className={classes.select} inputProps={{ classes: { icon: classes.icon } }} autoWidth={true} onChange={(e)=>{onChange(e.target.value)}}>
            {opModes.map(o => (
              <MenuItem value={o} key={o}>{o}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default withStyles(styles)(OpModeSelector)
