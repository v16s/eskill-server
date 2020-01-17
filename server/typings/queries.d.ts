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

export type Faculties = Resolver<{course: string, campus: string}, prisma.User[] | undefined>

export type Student = Resolver<{id: string}, prisma.User | null>

export type Instances = Resolver<{where: {course: string} | any}, prisma.CourseInstance[] | undefined>

export type Instance = Resolver<{id: string}, prisma.CourseInstance | null>

export type Problems = Resolver<{}, prisma.Problem[] | undefined>










