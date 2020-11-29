import { AppBar, CssBaseline, Slide, Toolbar, useScrollTrigger, Typography, IconButton } from '@material-ui/core'
import { Info, Home, Help, ExitToApp } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useSessionContext } from '../context/SessionContext';

interface Props {
    
}

interface HideOnScrollProps {

    window?: () => Window;
    children: React.ReactElement;
}

const HideOnScroll = (props: HideOnScrollProps) => {
    const {children, window} = props

    const trigger = useScrollTrigger({ target: window ? window() : undefined});

    return(
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            paddingBottom: '3rem',
            position: 'absolute'
        },
        button: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1
        }
    })
)

export const Navbar: React.FC = (props: Props) => {
   
    
    const classes = useStyles();
    const history = useHistory();
    const [sessionContext, updateSessionContext] = useSessionContext();

    const removeAuthenticationContext = () =>{
        updateSessionContext({  isAuthenticated: false,
            redirectPathOnAuthentication: '/home'})
        localStorage.removeItem("isAuthenticated")
        history.push('/home')
      }

    return (
        <>
    <div className={classes.root}>
    <CssBaseline />
    <HideOnScroll {...props}>
    <AppBar>
        <Toolbar>
            <Typography variant="h6" className={classes.title}>Life Pathways</Typography>
            <div style={{float: 'right'}}>
            <IconButton size="medium" className={classes.button} component={Link} to="/home">
            <Home fontSize="inherit" htmlColor="white"/>
            </IconButton>
            <IconButton size="medium" className={classes.button} component={Link} to="/about">
            <Info fontSize="inherit" htmlColor="white"/>
            </IconButton>
            <IconButton size="medium" className={classes.button} component={Link} to="/help">
            <Help fontSize="inherit" htmlColor="white"/>
            </IconButton>
            {sessionContext.isAuthenticated &&
             <IconButton size="medium" className={classes.button}  onClick={() => removeAuthenticationContext()}>
             <ExitToApp />
             </IconButton>
            }
            </div>
        </Toolbar>
    </AppBar>
    </HideOnScroll>
    </div>
        </>
    )
}
