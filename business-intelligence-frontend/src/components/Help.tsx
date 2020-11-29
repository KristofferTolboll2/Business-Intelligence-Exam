import { makeStyles } from '@material-ui/core'
import React from 'react'

interface Props {
    
}

const useStyles = makeStyles({
    root:{
        paddingTop: '3rem'
    }
})

export const Help = (props: Props) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <h1>Help</h1>
        </div>
    )
}
