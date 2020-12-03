import { Button, Grid, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import { ContainerWrapper } from '../../ui/dashboard/ContainerWrapper'
import { DashboardWrapper } from '../../ui/dashboard/DashboardWrapper'
import { useStyles } from '../../ui/dashboard/useDashboardStyles'
import clsx from 'clsx';
import { Link } from 'react-router-dom'
import { WorkplaceSurvey } from './surveys/workplace-survey/WorkplaceSurevey'

interface Props {
    
}


const data = null

export const Insights: React.FC<Props> = (props: Props) => {

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
    const [showWorkplaceSurvey, setShowWorkplaceSurvey] = useState<boolean>(false);



    return (
        <div>
          { showWorkplaceSurvey &&
          <WorkplaceSurvey isOpen={showWorkplaceSurvey} handleClose={() => setShowWorkplaceSurvey(false)} />
          }
            <DashboardWrapper>
            <ContainerWrapper>
            <>
            <Grid container spacing={3}>
            
            {/* Description */}
            <Grid item xs={12} md={8} lg={8}>
              <Paper className={fixedHeightPaper}>
                <div>
                    To get more insight in your mental health, 
                    answer some questions about yourself. 
                
                </div>
              </Paper>
            </Grid>
            {/* */}

              {/* Get started */}
              <Grid item xs={12} md={4} lg={4}>
              
              <Paper className={fixedHeightPaper}>
                <div>
                    <b>Get started!</b> 
                    <br />
                    <br />
                    Tak our mental Health Survey, and get customized tasks for your dashboard
                    <br />
                    <br />
                    <Button fullWidth variant="outlined" color="primary" onClick={() => setShowWorkplaceSurvey(true)}> Health in the work place</Button>
                </div>
              </Paper>
            </Grid>
            {/* */}
            <Grid item xs={12} md={12} lg={12}>
              
              <Paper className={fixedHeightPaper}>
                <div>
                    {data === null &&
                    <p>No surveys answered yet</p>}
                </div>
              </Paper>
            </Grid>

            </Grid>
            </>
            </ContainerWrapper>
            </DashboardWrapper>
        </div>
    )
}
