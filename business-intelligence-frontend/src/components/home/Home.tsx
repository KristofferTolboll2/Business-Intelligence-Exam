import React, { useState, useEffect } from 'react'
import { LoginModal } from './authentication/LoginModal';
import { Grid, Paper, Typography, Button } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSessionContext } from '../../context/SessionContext';
import { Redirect, useHistory } from 'react-router-dom';

interface Props {
    
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '1rem'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    buttonGroup:{
        padding: theme.spacing(1),
        display: 'grid'
    }
  }),
);

export const Home: React.FC = (props: Props) => {



    const classes = useStyles();

    let history = useHistory();
    const [sessionContext, updateSessionContext] = useSessionContext();
    const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
    const [isOpenSignUp, setIsOpenSignUp] = useState<boolean>(false);

    const setAuthenticationContext = (value: boolean, redirectPath: string, id: string) =>{
      updateSessionContext({...sessionContext, isAuthenticated: value, redirectPathOnAuthentication: redirectPath, id: id})
      console.log('update')
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("id", id)
      history.push('/dashboard')
    }

    console.log(sessionContext)


    useEffect(() =>{
      console.log('home render')
      if(sessionContext.isAuthenticated){
        history.push('/dashboard')
      }
    })

    return (
      <>
      <LoginModal setIsAuth={setAuthenticationContext} isOpen={isOpenLogin} handleClose={() => setIsOpenLogin(false)}/>
        <div className={classes.root}>
        <h1>Home</h1>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" style={{color: 'black'}}>
                        We aim to improve mental health, sign into our application in get started today!
                    </Typography>
                    <br />
                    <div className={classes.buttonGroup}>
                    <Button  onClick={() => setIsOpenSignUp(true)}>Get Started</Button>
                    <Button onClick={() => setIsOpenLogin(true)}>I already have an account</Button>
                    </div>
                </Paper>
            </Grid>
        </Grid>
        </div>
        </>
    )
}
