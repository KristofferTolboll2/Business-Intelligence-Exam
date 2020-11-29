import { Container, makeStyles } from '@material-ui/core'
import React from 'react'

interface Props {
    children: React.ReactElement
}

const useStyles = makeStyles((theme) =>({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
}));
   
export const ContainerWrapper = (props: Props) => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>
        {props.children}        
        </Container>
    )
}
