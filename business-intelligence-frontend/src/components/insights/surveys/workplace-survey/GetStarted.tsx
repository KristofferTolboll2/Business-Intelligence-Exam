import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react'

interface Props {
    startHandler: () => void
}

const useStyles = makeStyles({
    textbox:{
        padding: '1rem',
        marginTop: '1rem',
        opacity: 0.8,
        color: 'grey',
        fontSize: '1.1rem'
    },
    image: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%"
    },
    buttonContainer: {
        padding: '5px',
        textAlign: 'center'
    }
})

export const GetStarted = (props: Props) => {
    const { startHandler } = props;
    const classes = useStyles();

    return (
        <div>
        <img className={classes.image} src="https://www.flaticon.com/svg/static/icons/svg/1111/1111512.svg" />
        <div className={classes.textbox}>
        We spend the majority of our day at our workplace, and it is therefore important, that we are comfortable in our work enviroment. 
        By answering a few questions we can guide you in the right direction, to improve your well being at the workplace.
        </div>
        <div className={classes.buttonContainer}>
        <Button variant="contained" color="primary" onClick={() => startHandler()}>Get started</Button>
        </div>
        </div>
    )
}
