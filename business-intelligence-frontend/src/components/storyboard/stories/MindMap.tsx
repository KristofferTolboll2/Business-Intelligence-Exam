import useAxios from 'axios-hooks';
import React, { useEffect, useState, useMemo } from 'react'
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';
import { getNodeData } from '../../../api/http/storyboard.api';
import data from './data.json'


interface Props {
 
}




export const MindMap: React.FC<Props> = (props: Props) => {
    console.log('rendered plot')

    const [{data, loading, error}, refetch] = useAxios(getNodeData(0, 0))

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        console.error(error)
        return <div>Something went wrong</div>
    }

    console.log(data)
    return (
        <div>
        <ForceGraph3D
        graphData={data}
        nodeAutoColorBy="group"
        nodeThreeObject={node => {
            const sprite = new SpriteText(String(node.id));
            sprite.color = "red";
            sprite.textHeight = 8;
            return sprite;
          }}
        />
    </div> 
    )
}
