import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react'
import { GET_RELEVANT_TASKS, RelevantTaskVars, TableTask, RelevantTasksResult } from '../../../../api/graphql/task.api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Row } from './Row'
import { Alarm, PlusOne } from '@material-ui/icons';
import { Button, IconButton } from '@material-ui/core';
import { EnhancedToolbar } from './EnhancedToolbar';
import { ITaskTypes } from '../../../../api/graphql/task.api';
import { AddTask } from './AddTask';

interface Props {
    
}


export const taskTypes = Object.freeze({
    MOST_RELEVANT: "MOST_RELEVANT",
    NOT_COMPLETED: "NOT_COMPLETED",
    COMPLETED: "COMPLETED"
})

export const TaskTable: React.FC<Props> = (props: Props) => {
    
    const [limit, setLimit] = useState<number>(10);
    const [showTimeLeft, setShowTimeLeft] = useState<boolean>(false);
    const [taskType, setTaskType] = useState<string>(taskTypes.MOST_RELEVANT)
    const [showAddTask, setShowAddTask] = useState<boolean>(false);

    const {loading, data, error, refetch} = useQuery<RelevantTasksResult, RelevantTaskVars>(
        GET_RELEVANT_TASKS, 
        {variables: {userId: "1", limit: limit, type: taskType}}
    )
        

    const changeTaskTypeHandler = (event: React.ChangeEvent<{value: unknown}>) => {
        setTaskType(event.target.value as string);
    }

    console.log(taskType)

    useEffect(() =>{
        refetch()
    }, [limit])

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Something went wrong</div>
    }
    
    console.log(data)
    return (
        <>
        <AddTask isOpen={showAddTask} handleClose={() => setShowAddTask(false)} refetch={refetch}/>
        <EnhancedToolbar value={taskType} setTaskType={changeTaskTypeHandler} />
         <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="left">Created 
                <IconButton onClick={() => setShowTimeLeft(!showTimeLeft)}>
                    <Alarm />
                </IconButton>
             </TableCell>
            <TableCell align="left">Expiration</TableCell>
            <TableCell align="left">Completed&nbsp;(g)</TableCell>
            <TableCell align="right">
                <Button
                variant="contained"
                color="primary"
                onClick={() => setShowAddTask(true)}
                startIcon={<PlusOne />}>Add task</Button>
                </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data?.getRelevantTasks.map((row, index) => (
            <Row key={row.title + index} row={row} showTimeLeft={showTimeLeft} 
            id={row.id} refetch={refetch} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>   
        </>
    )
}
