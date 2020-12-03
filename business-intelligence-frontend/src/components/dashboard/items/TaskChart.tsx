import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Menu, Typography, MenuItem, InputLabel, FormHelperText, FormControl, Select } from '@material-ui/core';
import { Task } from '../../../api/graphql/user.api';
import { WithDate, BaseTaskVars, GET_TASK_WITH_DATE } from '../../../api/graphql/task.api'
import { useQuery } from '@apollo/client';
import { setDateHandler } from '../../../util/date.util';
import { aggregateTasks } from '../../../util/aggregation.util';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

const  createData = (date: string, completed: number, notCompleted: number) => {
    return { date, completed, notCompleted };
  }


  interface Props {
    tasks: Task[] | undefined
  }

  export enum DateMetric {
    Daily = 'DAILY',
    Weekly = 'WEEKLY',
    Monthly = 'MONTHLY',
    Last_Month = 'LAST_MONTH'
  }

export const TaskChart: React.FC<Props> = (props) =>{
 
  const theme = useTheme();
  const classes = useStyles()
  const [dateMetric, setDateMetric] = useState<DateMetric>(DateMetric.Weekly);
  const [dateString, setDateString] = useState<string>(setDateHandler(dateMetric))
  const [aggregatedData, setAggregatedData] = useState<any[]>([])

  console.log(dateString)

  const {loading, data, error, refetch} = useQuery<WithDate, BaseTaskVars>(
    GET_TASK_WITH_DATE, 
    {variables: {userId: "1", date: dateString, isAfter: (dateMetric !== DateMetric.Last_Month)}}
)

const handleChange = (event: React.ChangeEvent<{value: unknown}>) =>{
  setDateMetric(event.target.value as DateMetric)
} 

useEffect(() =>{
  //change the date string in a useEffect hook everytime the
  //dateMetric state is changed. 
  setDateString(setDateHandler(dateMetric))
  refetch()
}, [dateMetric])

useEffect(() =>{
  //ever
  if(!loading && data){
    const aggregatedData: Object = aggregateTasks(data.getTasksWithDate)
    console.log(aggregatedData)
    const mappedDataTasks = Object.entries(aggregatedData).map(entry =>{
      return createData(entry[0], entry[1].completed, entry[1].notCompleted)
    })
    console.log(mappedDataTasks)
   setAggregatedData(mappedDataTasks)
  }  
}, [data])


console.log(data)

if(loading){
  return <div>Loading...</div>
}

  return(
    <>
    <Typography variant="h5">Tasks completed</Typography>
    <ResponsiveContainer>
    <LineChart
          data={aggregatedData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Tasks
            </Label>
          </YAxis>
          <Legend />
          <Tooltip />
          <Line type="monotone" name="Not Completed" dataKey="notCompleted" stroke={theme.palette.primary.main} dot={true} />
          <Line type="monotone" name="Completed" dataKey="completed" stroke={theme.palette.primary.light} dot={true} />
        </LineChart>
    </ResponsiveContainer>
    <div>
        <InputLabel id="demo-simple-select-label">Date Format</InputLabel>
        <Select
          fullWidth={true}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dateMetric}
          onChange={handleChange}
        >
          <MenuItem value={DateMetric.Daily}>Daily</MenuItem>
          <MenuItem value={DateMetric.Weekly}>This Week</MenuItem>
          <MenuItem value={DateMetric.Monthly}>This Month</MenuItem>
          <MenuItem value={DateMetric.Last_Month}>Last Month</MenuItem>
        </Select>
        </div>
    </>
  )
}