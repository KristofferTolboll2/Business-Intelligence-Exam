import { Button, DialogContent, DialogTitle } from '@material-ui/core';
import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react'
import { getQuestions, submitSurvey } from '../../../../api/http/survey.api';
import { BaseModal } from '../../../../ui/BaseModal'
import { Question } from '../workplace-survey/Question';
import { GetStarted } from './GetStarted';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';

interface Props {
    isOpen: boolean
    handleClose: () => void
}

interface PredictionResponse {
    prediction: number[]
}

export const WorkplaceSurvey: React.FC<Props> = (props: Props) => {
    
    const { isOpen, handleClose } = props;

    const [page, setPage] = useState<number>(1);
    const [offset, setOffset] = useState<number>(0);
    const [selectedValues, setSelectedValues] = useState<any[]>([])
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [questions, setQuestions] = useState<any[]>([])

    const setSelectedValuesHandler = ({value, index}: {value: string, index: number}) =>{
        setSelectedValues((prevState) =>{
            const updatedValues = [...prevState]
            const arrIndex = updatedValues.indexOf(index);
            console.log(arrIndex)
            console.log(value)
            if(arrIndex === -1){
                updatedValues[index] = value
            }
            return updatedValues
        })
        console.log(selectedValues)

    }



    console.log(selectedValues)
    const [{data, loading, error}, refetch] = useAxios(getQuestions());

    useEffect(() => {

        console.log(offset)
        if(data){
        const questions = data.slice(offset, offset + 10).map((question: any, index: number) =>{
            const _index = index + offset
            console.log(_index)
            console.log(selectedValues[_index])
            return <Question key={question + index} entry={question} selectedValue={selectedValues[_index]} setSelectedValue={setSelectedValuesHandler} index={_index} />
        })
        
        setQuestions(questions)
        }

        }, [selectedValues, offset, data])
    

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        console.error(error);
        return <div>Someting went wrong..</div>
    }


    const submitHandler = async (e: React.MouseEvent<HTMLElement>) =>{
        e.preventDefault()
        console.log(selectedValues)
        const response = await axios.post(submitSurvey(), selectedValues);
        console.log(response.data)
        if(response.status === 201){
        alert('Thank you for your submission')
        handleClose()
        }else{
            alert('Something went wrong please try again')
        }
    }

   

    console.log(questions)

    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose}>
        <>
        <DialogTitle id="form-dialog-title">Mental health in the workplace</DialogTitle>
        <DialogContent>
            {isStarted ? 
            <div>
            {questions}
            <Pagination  variant="outlined" color="primary"
            page={page}
            count={(data.length / 10) % 2 === 0 ? Math.floor(data.length / 10): Math.floor(data.length / 10) + 1}
            onChange={(event, page) =>{
                event.preventDefault()
                setPage(page)
                setOffset(Math.floor((page * 10) - 10))
            }}
            />
            {(selectedValues.length === data.length && !selectedValues.includes(undefined))
            && 
            <div style={{padding: '0.5rem', display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" color="primary" onClick={(e) => submitHandler(e)}>Submit </Button>
            </div>}

            </div>
            :
           <GetStarted startHandler={() => setIsStarted(true)} />     
            }   
           
           </DialogContent>
        </>
        </BaseModal>
    )
}
