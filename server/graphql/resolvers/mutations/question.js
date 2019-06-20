import { prisma } from 'prisma'
import bcrypt from 'bcrypt-nodejs'
import { promisify } from 'util'
import { AuthenticationError, ValidationError } from 'apollo-server-express'
import { async } from 'q'
export default {
  addQuestion: async (
    _parent,
    { course, name, desc, exp, Obj, ans, picture },
    { user, bucket }
  ) => {
    let sp = user.username.split('-')
    let cor = sp[0]
    if (user.level < 1 || (user.level == 2 && course == cor)) {
      try {
        let question = await prisma.createQuestion({
          course,
          name,
          desc,
          exp,
          opt: { create: Obj },
          ans
        })
        return new Promise(async (resolve, reject) => {
          try {
            if (picture) {
              const { createReadStream, filename } = await picture
              let ar = filename.split('.')
              let ext = ar[ar.length - 1]
              let img = `${question.id}.jpg`
              createReadStream()
                .pipe(bucket.openUploadStream(img))
                .on('finish', () => {
                  resolve(question)
                })
            } else {
              resolve(question)
            }
          } catch (e) {
            reject(new ValidationError(e.toString()))
          }
        })
      } catch (e) {
        console.log(e)
        throw new ValidationError(e.toString())
      }
    } else {
      throw new AuthenticationError('Unauthorized')
    }
  },

  removeQuestion: async (parent, { id, course }, { user, bucket }) => {
    let sp = user.username.split('-')
    let cor = sp[0]
    if (user.level < 1 || (user.level == 2 && course == cor)) {
      try {
        try {
          let image = bucket.find({ filename: `${id}.jpg` })
          let { _id } = await image.next()
          bucket.delete(_id)
        } catch (e) {}
        return await prisma.deleteQuestion({ id })
      } catch (e) {
        throw new ValidationError(e.toString())
      }
    } else {
      throw new AuthenticationError('Unauthorized')
    }
  },

  updateQuestion: async (
    parent,
    { id, course, name, desc, exp, Obj, ans, picture },
    { user, bucket }
  ) => {
    let sp = user.username.split('-')
    let cor = sp[0]
    if (user.level < 1 || (user.level == 2 && newCourse == cor)) {
      try {
        try {
          let image = bucket.find({ filename: `${id}.jpg` })
          let { _id } = await image.next()
          bucket.delete(_id)
        } catch (e) {}
        let q = await prisma.deleteQuestion({ id })
        let question = await prisma.createQuestion({
          course,
          name,
          desc,
          exp,
          opt: { create: Obj },
          ans
        })
        return new Promise(async (resolve, reject) => {
          try {
            if (picture) {
              const { createReadStream, filename } = await picture
              let ar = filename.split('.')
              let ext = ar[ar.length - 1]
              let img = `${question.id}.jpg`
              createReadStream()
                .pipe(bucket.openUploadStream(img))
                .on('finish', () => {
                  resolve(question)
                })
            } else {
              resolve(question)
            }
          } catch (e) {
            reject(new ValidationError(e.toString()))
          }
        })
      } catch (e) {
        console.log(e)
        throw new ValidationError(e.toString())
      }
    } else {
      throw new AuthenticationError('Unauthorized')
    }
  }
}
