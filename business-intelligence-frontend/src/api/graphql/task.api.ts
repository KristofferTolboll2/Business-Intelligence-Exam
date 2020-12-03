import { gql } from "@apollo/client";

export interface BaseTaskVars {
    userId: string,
    date: string,
    isAfter: boolean
}

export enum ITaskTypes {
  MOST_RELEVANT ="MOST_RELEVANT",
  NOT_COMPLETED = "NOT_COMPLETED",
  COMPLETED = "COMPLETED"
}

export interface RelevantTaskVars {
  userId: string,
  limit: number
  type: string
}

export interface TableTask {
  id: string,
  title: string,
  description: string,
  taskCreatedAt: Date,
  expirationDate: Date,
  completedAt: Date | null
}

export interface BaseTask {
    id: string
    description: string
    taskCreatedAt: string
    completedAt: string
    expirationDate: string 
}

export interface WithDate {
    getTasksWithDate: BaseTask[]
}

export interface RelevantTasksResult {
  getRelevantTasks: TableTask[]
}

export const GET_TASK_WITH_DATE = gql`
  query getTasksWithDate($userId: String!, $date: String!, $isAfter: Boolean!) {
    getTasksWithDate(userId: $userId, date: $date, isAfter: $isAfter){
    id
    completedAt
    taskCreatedAt
    description
    expirationDate
  }
  }
`

export const GET_RELEVANT_TASKS = gql`
 query getRelevantTasks($userId: String!, $limit: Float!, $type: taskType!){
  getRelevantTasks(input: {
    userId: $userId, limit: $limit, type: $type
    }){
    id,
    title,
    description,
    taskCreatedAt,
    expirationDate,
    completedAt
  }
}
`

export const COMPLETE_TASK = gql`
 mutation completeTask ($id: String!) {
    completeTask(id: $id){
    id
    description
    completedAt
    taskCreatedAt
}
}
`

export interface CreateTaskInput {
  user: string, 
  title: string,
  description: string, 
  expirationDate: string,
}


export const CREATE_TASK = gql`
  mutation createTask(
    $user: String! $title: String!, $description: String!, $expirationDate: String!
    ){
      createTask(input: {
        user: $user, title: $title, description: $description, expirationDate: $expirationDate
      }){
      id, 
      title,
      description,
      taskCreatedAt,
      expirationDate,
      completedAt
      }
    }
`