import {Resolver} from './apollo'
import * as prisma from '../prisma'

interface QuestionResponseBase extends prisma.Question {
    display?: string
}

export type QuestionResponse = QuestionResponseBase | null 

export type TokenExistence = Resolver<{token: string}, boolean>

export type Global = Resolver<any, prisma.Global | {recovery: any} >

export type Branches = Resolver<{}, prisma.Branch[]>

export type Validate = Resolver<{}, prisma.User | null>

export type Campuses = Resolver<{}, prisma.Campus[]>

export type Courses = Resolver<{where: any}, prisma.Course[]>

export type Questions = Resolver<{where: any}, prisma.Question[]>

export type Question = Resolver<{id: string}, QuestionResponse>