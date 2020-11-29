import { InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React from 'react'


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
    selectedValue: any[],
    setSelectedValue: () => void
}

export const Question = (props: Props) => {

    const classes = useStyles()
    const {entry: {question, answerOptions}, selectedValue, setSelectedValue} = props;

    if(answerOptions instanceof Object) {
        console.log(answerOptions)
    }
    return (
        <div className={classes.root}>
            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
            <Typography variant="h5">{question}</Typography>
            <br />
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedValue}
          onChange={setSelectedValue}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </div>
    )
}
