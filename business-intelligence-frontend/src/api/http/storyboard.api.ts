import { BASE_URL } from '../../config';
const namespace = 'storyboard'

export const getNodeData = (nodeAmount: number, linkAmount: number) =>{
    return `${BASE_URL}/${namespace}/getData`
}