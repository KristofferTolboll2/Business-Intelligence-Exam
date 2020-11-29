import { BASE_URL } from "../../config"

const SURVEY_NAMESPACE = "dataprovider"


export const getQuestions = (offset: number, limit: number ) => (`${BASE_URL}/${SURVEY_NAMESPACE}/questions?offset=${offset}&limit=${limit}`)