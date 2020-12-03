import { BASE_URL } from "../../config"

const SURVEY_NAMESPACE = "dataprovider"

//we can add offset and limit, but in this case, we just want to fetch all questions
export const getQuestions = () => (`${BASE_URL}/${SURVEY_NAMESPACE}/questions`)