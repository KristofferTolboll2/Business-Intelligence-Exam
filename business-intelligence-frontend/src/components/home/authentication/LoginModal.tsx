import { Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { BaseModal } from '../../../ui/BaseModal';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface Props {
    isOpen: boolean, 
    handleClose: () => void,
    setIsAuth: (value: boolean, redirecPath: string, id: string) => void
}

type Error = {
    message: string
}

export const LoginModal: React.FC<Props> = (props: Props) => {
    
    const { isOpen, handleClose, setIsAuth } = props

    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<Error>({message: ""})

    const handleAuth = () =>{
        const isAuth: boolean = email === "test@gmail.com" && password === "123" ? true : false
        console.log(email);
        console.log(password)
        if(isAuth){
            setIsAuth(true, '/dashboard', "1")
        }else{
            console.log("error")
            setError({message: "Wrong username or password"})
        }
    }
    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose}>
        <>
       <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText> Login using email and password, and get started 
          </DialogContentText>
          <form onSubmit={handleAuth}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
          />
              <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.currentTarget.value)
                console.log(e.currentTarget.value)
             }}
          />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAuth} color="primary">
            Login
          </Button>
        </DialogActions>  
        </>     
        </BaseModal>
    )
}
