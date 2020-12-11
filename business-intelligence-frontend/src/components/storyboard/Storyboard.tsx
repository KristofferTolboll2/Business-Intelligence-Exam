import { Button, Grid, Paper, Switch, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { ContainerWrapper } from '../../ui/dashboard/ContainerWrapper'
import { DashboardWrapper } from '../../ui/dashboard/DashboardWrapper'
import { useStyles } from '../../ui/dashboard/useDashboardStyles'
import clsx from 'clsx';
import { MindMap } from './stories/MindMap'
import { BaseModal } from '../../ui/BaseModal'

interface Props {
    
}


export const Storyboard: React.FC<Props> = (props: Props) => {
    
    const classes = useStyles();
    const [showMindmap, setShowMindMap] = useState<boolean>(false);
    const [showGraph, setShowGraph] = useState<boolean>(false);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [isThreeDimensional, setIsThreeDimensional] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
      setIsThreeDimensional(event.target.checked)
    }
    
    return (
        <DashboardWrapper>
          <div>
          <BaseModal isOpen={showMindmap} handleClose={() => setShowMindMap(false)} isFullscreeen={true}>
          <MindMap />
          </BaseModal>
            <ContainerWrapper>
                <>
                <Grid container spacing={3}>
            {/* Description */}
            <Grid item xs={12} md={12} lg={12}>
              
              <Paper>
                <br />
                <h1 style={{textAlign: 'center'}}>Storyboard</h1>
                <br />
            </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
                <Paper>
                  <Typography variant="h5" style={{textAlign: 'center'}}>
                    Mindmap
                  </Typography>
                  <p style={{margin: '0 5px', fontStyle: 'italic', textAlign: 'center', fontSize: '1.2rem'}}>
                  This is a way to visualize different mental illnesses and their relation to eachother. Mental Health issues, can be a downgoing spiral, and multiple diseases can enhance each other. 
                  </p>
                  <div className="button-container" style={{display: 'flex', justifyContent: 'center', padding: '1.2 rem'}}>
                  <Button variant="contained" color="primary" onClick={() => setShowMindMap(true)}>Show mindmap</Button>
                  </div>
                  <p style={{margin: '0 5px', fontStyle: 'italic', textAlign: 'center', fontSize: '1.2rem'}}>
                    This will give you more insight, on how different diseases are linked together.
                    You can drag the nodes around, and see the different interaction with eachother. 
                    As the system begins to scale new patterns can emerge from the data, and we begin to look into correlations between different diseases.  
                  </p>
     
                  </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <h1 style={{textAlign: 'center'}}>Storyboard</h1>
                <Button variant="contained" color="primary" onClick={() => setShowMindMap(true)}>Show graph</Button>
                <Switch checked={isThreeDimensional} onChange={handleChange} />
            </Paper>


            </Grid>


            
            </Grid>
            </>
          </ContainerWrapper>  
          </div>
          </DashboardWrapper>
    )
}
