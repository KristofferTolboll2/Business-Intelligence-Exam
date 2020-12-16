import React, { useCallback, useContext, useEffect } from 'react'
import { BaseModal } from '../../../../ui/BaseModal'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form'
import { CreateTaskInput, CREATE_TASK } from '../../../../api/graphql/task.api';
import moment from 'moment'
import { useMutation } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import { SessionContext } from '../../../../context/SessionContext';
import { Title } from '@material-ui/icons';

enum ErrorTypes {
    DUPLICATE_TITLE,
}

interface Props {
    isOpen: boolean
    handleClose: () => void
    refetch: () => void
    title?: string,
    description?: string
}

export const AddTask = (props: Props) => {
    const {isOpen, handleClose, refetch, title, description} = props
    
    
    const defaultDate = moment().add(3, 'h').format("YYYY-MM-DDTHH:MM")
    console.log(title)
    console.log(description)

    //extract user id from sessioncontext
    const [{id}] = useContext(SessionContext);
    const [showError, setShowError] = React.useState<boolean>(false);

    const [createTask, {loading: createTaskLoading, error: createTaskError}] = useMutation(CREATE_TASK);
    const { register, handleSubmit, setValue, reset } = useForm<CreateTaskInput>({
        defaultValues: {title: title, description: description}
    });
    const onSubmit = useCallback((formValues: CreateTaskInput) =>{
        const parsedDate: string = new Date(formValues.expirationDate).toISOString();
        console.log(parsedDate)
        createTask({variables: {expirationDate: parsedDate, title: formValues.title, description: formValues.description, user: id}})
        .then(res =>{
            console.log(res)
            refetch()
            handleClose()
        })
        .catch(err =>{
            console.error(err)
            setShowError(true)
        })   
    }, [])

    useEffect(() =>{
        if(title && description){
            reset({
                title: title, 
                description: description
            })
        }
    }, [title, description])

    console.log(id)
   
    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose}>
        <>
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Add another task
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            inputRef={register}
            autoFocus
            onFocus={() => setShowError(false)}
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            error={(!!createTaskError && showError)}
            helperText={(!!createTaskError && showError) && createTaskError?.message}
            />
             <TextField
            inputRef={register}
            autoFocus
            onFocus={() => setShowError(false)}
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
          />
         <TextField
            onFocus={() => setShowError(false)}
        label="Due date"
        type="datetime-local"
        name="expirationDate"
        id="expirationDate"
        defaultValue={defaultDate}
        fullWidth
        inputRef={register}
        InputLabelProps={{
        shrink: true,
        }}
        />
        <br />
        <br />
          <Button
          fullWidth
          type="submit"
          variant="outlined">
              {createTaskLoading ?
              <CircularProgress />
              : "Submit" }
          </Button>
           </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
        </>
        </BaseModal>
    )
}
