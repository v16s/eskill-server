import { AuthenticationError, ValidationError } from 'apollo-server-express'
import { prisma } from 'prisma'

let question = `
query Questions($course: String!) {
    questions(where: {course: $course}){
        id
    }
}
`
function shuffle (array) {
  array.sort(() => Math.random() - 0.5)
}
export default {
  acceptCourseInstance: async (_, { id }, { user }) => {
    if (user.level == 3) {
      try {
        let instance = await prisma.courseInstance({ id })
        let { course } = instance
        if (instance.facultyID != user.id) throw new AuthenticationError()
        let { questions: ques } = await prisma.$graphql(question, {
          course
        })
        shuffle(ques)
        let n = ques.length
        let obj = ques.slice(0, n).map(k => ({ ...k, status: 0 }))
        let total = n
        let completed = 0
        return await prisma.updateCourseInstance({
          where: { id },
          data: { questions: { create: obj }, completed, total, status: true }
        })
      } catch (e) {
        throw new ValidationError(e.toString())
      }
    } else {
      throw new AuthenticationError('Unauthorized')
    }
  },
  rejectCourseInstance: async (_parent, { id }, { user }) => {
    if (user.level == 3) {
      try {
        return await prisma.deleteCourseInstance({ id })
      } catch (e) {
        throw new ValidationError(e.toString())
      }
    } else {
      throw new AuthenticationError('Unauthorized')
    }
  }
}
