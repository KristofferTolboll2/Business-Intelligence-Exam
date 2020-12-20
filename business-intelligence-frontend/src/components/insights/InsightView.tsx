import useAxios from 'axios-hooks'
import React from 'react'
import { getSurveyPreidction } from '../../api/http/survey.api';
import { useSessionContext } from '../../context/SessionContext'
import patrick from './data/patrick.gif';
import meditate from './data/meditate.gif';
import { makeStyles } from '@material-ui/core';
interface Props {
    
}

interface SurveyResponse {
    id: number
    surveyPrediction: number
}

const useStyles = makeStyles({
    imageContainer: {
        padding: '1rem',
        width: '50%', 
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        height: '100%',
        textAlign: 'center'
    }
})

export const InsightView: React.FC<Props> = (props: Props) => {
    
    const classes = useStyles()
    const [sessionContext] = useSessionContext();
    const { id } = sessionContext;
    const [{data, loading, error}, refetch] = useAxios(getSurveyPreidction(Number(id)));


    if(loading){
        return <div>Loading....</div>
    }
    if(error){
        <div>Something went wrong...</div>
    }
    
    if(!data){
        return(
            <div>
                Answer surveys to get a prediction on your mental Health
            </div>
        )
    }
    const { surveyPrediction } = data;

    const dataContent = surveyPrediction === 0 ? 
    <div>
    <div>
    <p>Based on over 2000 survey answers we have predicted, that your mental health level is very stable.
    Keep using our application to keep it up. Use your task everyday and keep up the good mood
    </p>
    </div>
    <img className={classes.imageContainer} src={patrick}></img>
    </div>
    :
    <div>We have predicted, that you might have some mental health issues. Talk to friends family and seek professional help if needed.
    Our applicaton will help keep your life on track. Don't worry better times are coming 
    <img className={classes.imageContainer} src={meditate}></img>
    </div>



    
    
    return (
        <div>
        {dataContent}
        </div>
    )
}
