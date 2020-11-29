import useAxios from 'axios-hooks';
import React, { useState } from 'react'
import { getQuestions } from '../../../api/http/survey.api';
import { BaseModal } from '../../../ui/BaseModal'
import { Question } from './Question';

interface Props {
    isOpen: boolean
    handleClose: () => void
}

export const WorkplaceSurvey: React.FC<Props> = (props: Props) => {
    
    const { isOpen, handleClose } = props;

    const [offset, setOffset] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);
    const [selectedValues, setSelectedValues] = useState<any[]>([])


    const setSelectedValuesHandler = () =>{

    }

    console.log(props)
    const [{data, loading, error}, refetch] = useAxios(getQuestions(offset, limit));


    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        console.error(error);
        return <div>Someting went wrong..</div>
    }

    
    console.log(data)

    const questions = data.map((question: any, index: number) =>{
        console.log(question)
        return <Question entry={question} selectedValue={selectedValues[index]} setSelectedValue={setSelectedValuesHandler} />
    })
    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose}>
        <div>
            This is a motherfucking servey
            {questions}

        </div>
      
        </BaseModal>
    )
}
