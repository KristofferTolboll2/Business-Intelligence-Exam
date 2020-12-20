import { FLASK_URL } from "../../config";
import axios from 'axios'


export const createGraph = async(income: number, mentalHealthLevel: number, membershipDays: number) => axios.post(`${FLASK_URL}/plot`, {income: income, membership: membershipDays, mental: mentalHealthLevel})