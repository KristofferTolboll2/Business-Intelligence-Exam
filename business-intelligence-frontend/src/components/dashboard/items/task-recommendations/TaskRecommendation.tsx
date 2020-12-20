import React, {useState} from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { getSurveyAnswer } from '../../../../api/http/survey.api';
import useAxios from 'axios-hooks';
import { AddTask } from '../task-table/AddTask';
import { isObjectEmpty } from '../../../../util/aggregation.util';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

interface Props {
    
}

interface Task {
  title: string
  description: string
}


export const TaskRecommendation: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task>({title: "", description: ""});

    const [{data, loading, error}, refetch] = useAxios(getSurveyAnswer(1));

    if(loading){
      return <div>loading...</div>
    }

    if(error){
      return <div>Something went wrong</div>
    }

    const onSetTask = (task: Task) =>{
      setSelectedTask(task)
      setOpenModal(true);
    }

    const handleClick = () =>{
        setOpen(!open);
    }

    console.log(selectedTask)

    if(isObjectEmpty(data)){
      return <div>
          Complete survveys before we can recommend a task for you
        </div>
    }

    console.log(data)
    
    const tasks = !isObjectEmpty(data) && data.map((entry: Task, index: number) =>{
      return (
        <ListItem key={entry.title + index} button className={classes.nested} onClick={() => onSetTask(entry)}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={entry.title} />
          </ListItem>
      )
    })
    return (
        <div>
          <AddTask isOpen={isOpenModal} handleClose={() => setOpenModal(false)} refetch={() =>{}} title={selectedTask.title} description={selectedTask.description} />
    <List
        component="nav"
      aria-labelledby="nested-list-subheader"

      subheader={
        <ListSubheader component="div" id="nested-list-subheader"  style={{zIndex: 1000, backgroundColor: 'white', marginBottom: '10px', overflow: 'auto'}} >     
          Task recommendation
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Recommendations" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {tasks}
        </List>
      </Collapse>
    </List> 
        </div>
    )
}
