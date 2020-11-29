import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Block, Check, DoneAll } from '@material-ui/icons';
import { parseDateToTable } from '../../../../util/date.util';
import { useMutation } from '@apollo/client';
import { COMPLETE_TASK } from '../../../../api/graphql/task.api';


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    icon: {
        paddingLeft: '2rem'
    }
  });

export function createData(
    title: string,
    description: string,
    taskCreatedAt: Date,
    expirationDate: Date,
    completedAt: Date | null
){
    return{
        title, 
        description, 
        taskCreatedAt, 
        expirationDate, 
        completedAt
    }
}

interface Props {
    row: ReturnType<typeof createData>,
    showTimeLeft: boolean,
    id: string,
    refetch: () => void
}

export const Row = (props: Props) => {
    const { row, showTimeLeft, id, refetch } = props;
    const [open, setOpen] = useState<boolean>(false);
    const classes = useRowStyles();
    const [completeTask, { data }] = useMutation(COMPLETE_TASK);
    
    const isFinishedIcon = row.completedAt ? 
    <span className={classes.icon}><DoneAll /></span> : <span className={classes.icon}><Block /></span>
    
    
    const completeTaskHandler = () =>{
        completeTask({variables: {id: id}})
        refetch()
    }
    
    return (
        <>
            <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="left">{parseDateToTable(row.expirationDate, showTimeLeft)}</TableCell>
        <TableCell align="left">{parseDateToTable(row.taskCreatedAt, false)}</TableCell>
        <TableCell align="left">{isFinishedIcon}</TableCell>
        <TableCell align="right">
        <div className={classes.buttonContainer}>
        <Button
        startIcon={<DoneAll />}
        onClick={completeTaskHandler}
        >Complete</Button>
            <Button>Action</Button>
            </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <p>This is a test body </p>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
        </>
    )
}
