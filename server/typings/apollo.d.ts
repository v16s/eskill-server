import {User} from '../prisma'
import {GridFSBucket} from 'mongodb'
export interface Resolver<T, R> {
    (parent: any, args: T, context: {user: User | undefined, bucket: GridFSBucket}): Promise<R> | R
}