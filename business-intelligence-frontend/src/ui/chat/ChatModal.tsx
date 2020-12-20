import React, { useState } from 'react'
import { BaseModal } from '../BaseModal'
import { GiftedChat } from 'react-web-gifted-chat'
import { Message } from './Message'
import { Button, Input, TextField } from '@material-ui/core'

interface Props {
    isOpen: boolean,
    handleClose: () => void
}

const _messages = [{
    isUser: true,
    content: 'Hello developer'
},
{
    isUser: false,
    content: 'Hello developer'
},
{
    isUser: false,
    content: 'Hello developer'
},
{
    isUser: true,
    content: 'Hello developer'
}]



export const ChatModal: React.FC<Props> = (props: Props) => {
    const {isOpen, handleClose} = props;

    const [content, setContent] = useState<string>("");
    const [messages, setMessages] = useState<any[]>(_messages)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setContent(event.target.value as string);
    }

    const onSubmit = (event: any) =>{
        event.preventDefault()
        const newMessage = {
            isUser: true,
            content: content
        }
        setMessages(prevState => [...prevState, newMessage]);
        setContent("")
    }

    const messageComponents = messages.map((message, index) =>{
        const {isUser, content} = message
        return <Message key={index} isUser={isUser} content={content} />
    })
    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose}>
        <>
        <div style={{width: '600px', height: '700px'}}>
            {messageComponents}
            <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
            <TextField value={content} onChange={handleChange} variant="outlined"/>
            <Button onClick={onSubmit}>Send</Button>
            </div>
        </div>
        </>
        </BaseModal>
    )
}
