import React from 'react'
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton, Popover, Toolbar, Tooltip, Typography, Button, Box, Select, MenuItem, FormControl } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { taskTypes } from './TaskTable';
import { displayStringValue } from '../../../../util/aggregation.util';

interface Props {
    setTaskType: (event: React.ChangeEvent<{value: unknown}>) => void
    value: string
}

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}),
);
export const EnhancedToolbar = (props: Props) => {
    const {value, setTaskType} = props;
    const classes = useStyles();

    const menuOptions =  Object.entries(taskTypes).map(([key, value]) =>{
   
        return(   
        <MenuItem key={key} value={value}>{displayStringValue(key)}</MenuItem>
        )
    })

    console.log(value)

    return (
        <Toolbar className={classes.root}>
            <Typography className={classes.title} variant="h6">
                Tasks
            </Typography>
           
            <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Tooltip title="Select Tasks" {...bindTrigger(popupState)}>
            <IconButton aria-label="filter list">
            <FilterList />
            </IconButton>
            </Tooltip>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
              {/* content of popover */}
            <Box p={2}>
                <FormControl>
             <Select
             fullWidth
             value={value}
             onChange={setTaskType}
             >
            {menuOptions}
            </Select>
            </FormControl>
            </Box>
            {/* */}
          </Popover>
        </div>
      )}
    </PopupState>
        </Toolbar>
    )
}
