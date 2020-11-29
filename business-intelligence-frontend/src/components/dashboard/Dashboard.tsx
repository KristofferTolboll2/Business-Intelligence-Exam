import React from 'react'
import { useQuery } from '@apollo/client'
import { BaseUser, BaseUserVars, GET_DASHBOARD_USER } from '../../api/graphql/user.api'
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useStyles } from '../../ui/dashboard/useDashboardStyles'
import { TaskChart } from './items/TaskChart';
import { DashboardWrapper } from '../../ui/dashboard/DashboardWrapper';
import { ContainerWrapper } from '../../ui/dashboard/ContainerWrapper';
import { TaskTable } from './items/task-table/TaskTable';
import { TaskRecommendation } from './items/task-recommendations/TaskRecommendation';
interface Props {
    
}





export const Dashboard: React.FC<Props> = (props: Props) => {


    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const {loading, data, error} = useQuery<BaseUser, BaseUserVars>(
        GET_DASHBOARD_USER, 
        {variables: {id: "1"}}
    )

    if(loading) return(
        <div>Loading...</div>
    )
    if(error){
        console.error(error.message)
    }


    return (
     <DashboardWrapper>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <ContainerWrapper>
          <>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <TaskChart tasks={data?.userWithTasks.tasks} />
              </Paper>
            </Grid>

            {/* Task recommendations */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              <TaskRecommendation />
              </Paper>
            </Grid>

            {/* Task overview */}
            <Grid item xs={12}>
              <Paper className={classes.paper}> 
              <TaskTable />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
 
          </Box>
          </>
          </ContainerWrapper>
      </main>
      </DashboardWrapper>
    )
}
