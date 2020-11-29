import React from 'react'
import { gql } from '@apollo/client';

export enum Goal {
    MENTAL_HEALTH = 'MENTAL_HEALTH',
    PUNCTUAL = 'PUNCTUAL',
    MEET_PEOPLE = 'MEET_PEOPLE',
}

export interface Task {
  id: string, 
  description: string,
  completedAt: string | null,
  expirationDate: string
}

export interface BaseUser {
    userWithTasks:  {
    id: string 
    username: string
    age: number
    goal: Goal
    tasks: Task[]
    }
}

export interface BaseUserVars {
    id: string
}

export const GET_DASHBOARD_USER = gql`
    query userDashboard($id: String!){
    userWithTasks(id: $id){
    id 
    username
    biography
    goal
    tasks {
     id
     description
     completedAt
     expirationDate
    }
    }
  }`