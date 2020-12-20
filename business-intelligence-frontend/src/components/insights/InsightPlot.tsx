import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { createGraph } from '../../api/http/graph';

interface Props {
    
}


interface ImageResponse {
    image: string
}

export const InsightPlot: React.FC<Props> = (props: Props) => {
   
    
    const [income, setIncome] = useState<number>(0);
    const [mentalHealth, setMentalHealth] = useState<number>(0);
    const [membership, setMemberShip] = useState<number>(0);
    const [imageData, setImageData] = useState<ImageResponse>({image:""});


    const createPlotHandler = async (e: React.MouseEvent<HTMLElement>) =>{
        e.preventDefault()
        const response = await createGraph(income, mentalHealth, membership);
        console.log(response.data)
        setImageData(response.data)
    }
   
    console.log(imageData.image)
    const image = imageData.image !== "" ? <img src={`data:image/png;base64,${imageData.image}`} /> : null

    return (
        <div style={{height: '2000px'}}>
            
            <Button onClick={e => createPlotHandler(e)}>Create</Button>
       
             {image}
        </div>
    )
}
