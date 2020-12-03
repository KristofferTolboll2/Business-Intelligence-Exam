import { makeStyles } from '@material-ui/core'
import React from 'react'
import './Message.css';
import clsx from 'clsx';

export interface Message {
    content: string
    isUser: boolean
}


const useStyles = makeStyles((theme ) => ({
    buble: {
        width: "300px",
        margin: "50px auto",
        background: "#00bfb6",
        padding: "20px",
        textAlign: "center",
        fonteight: "900",
        color: "#fff",
        fontFamily: "arial",
        position: "relative"
    },
}))

export const Message: React.FC<Message> = (props: Message) => {
    const {isUser, content} = props
    const classes = useStyles();
    console.log(isUser)
    const sbClass = isUser ? "sb1" : "sb2"
    const allStyles = clsx(sbClass, classes.buble)
    return (
        <div className={allStyles}>
            {content}
        </div>
    )
}
