import { InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'


const useStyles = makeStyles({
    root: {
        padding: '1rem',
        margin: '5px'
    }
})


interface Props {
    entry: {
    question: string,
    //define type for answerOptions
    answerOptions: any[] | Object
    }
    selectedValue: string,
    setSelectedValue: ({value, index}: {value: string, index: number}) => void,
    index: number
}

interface Option {
    title: string,
    value: string 
}

export const Question = (props: Props) => {

    const classes = useStyles()
    const [parsedAnswerOptions, setParsedAnswerOptions] = useState<Option[]>([]);
    const {entry: {question, answerOptions}, selectedValue, setSelectedValue, index} = props;
    
    useEffect(() =>{

    if(Array.isArray(answerOptions)) {
        const options: Option[] = answerOptions.map(option =>({
            title: option,
            value: option
        }))
        setParsedAnswerOptions(options);
    }else{
     const options: Option[] = Object.entries(answerOptions).map(([key, value]) => ({
       title: value, 
        value: key
     })) 
     setParsedAnswerOptions(options);
    }
    }, [answerOptions])


    const handleChange = (event: React.ChangeEvent<{ value: unknown}> ) =>{
        const value: string = event.target.value as string;
        setSelectedValue({value, index})
    }


    const menuItems = parsedAnswerOptions.map((entry, index) =>{
        const { value } = entry;
        return (
            <MenuItem value={value} key={entry.title + index} id={entry.title}>{entry.title}</MenuItem>
        )
    })

    console.log(selectedValue)
    return (
        <div className={classes.root}>
            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
            <Typography variant="h5">{question}</Typography>
            <br />
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedValue ? selectedValue : ""}
          onChange={handleChange}
        >
        { menuItems }
        </Select>
        </div>
    )
}
