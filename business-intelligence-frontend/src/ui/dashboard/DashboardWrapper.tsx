import React from 'react'
import { useQuery } from '@apollo/client'
import { Fab, Popover, Typography } from '@material-ui/core'
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useStyles } from './useDashboardStyles'
import { mainListItems, secondaryListItems } from './listItems';
import { Add } from '@material-ui/icons';
import { BaseModal } from '../BaseModal';
import { ChatModal } from '../chat/ChatModal';


interface Props {
    children: React.ReactElement
}

export const DashboardWrapper: React.FC<Props> = (props: Props) => {
    
  const [open, setOpen] = React.useState<boolean>(false);
  const [showChat, setShowChat] = React.useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  
  return (
    <>
      <ChatModal isOpen={showChat} handleClose={() => setShowChat(false)} />
        <div className={classes.root}>
          <div style={{position: "fixed", right: 0, bottom: 0}} >
          <Fab color="primary" aria-label="add" onClick={() => setShowChat(!showChat)}>
        <Add />
        </Fab>
        </div>
        <CssBaseline />
     <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
       <Toolbar className={classes.toolbar}>
         <IconButton
           edge="start"
           color="inherit"
           aria-label="open drawer"
           onClick={handleDrawerOpen}
           className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
         >
           <MenuIcon />
         </IconButton>
         <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
           Dashboard
         </Typography>
         <IconButton color="inherit">
           <Badge badgeContent={4} color="secondary">
             <NotificationsIcon />
           </Badge>
         </IconButton>
       </Toolbar>
     </AppBar>
     <Drawer
       variant="permanent"
       classes={{
         paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
       }}
       open={open}
     >
       <div className={classes.toolbarIcon}>
         <IconButton onClick={handleDrawerClose}>
           <ChevronLeftIcon />
         </IconButton>
       </div>
       <Divider />
       <List>{mainListItems}</List>
       <Divider />
       <List>{secondaryListItems}</List>
       </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {props.children}
        </main>
     </div>

     </>
     
    )
}
