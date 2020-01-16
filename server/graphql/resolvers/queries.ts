import { prisma } from '../../prisma';
import { Question, QuestionResponse, Questions, Courses, Campuses, TokenExistence, Global, Branches, Validate } from '../../typings/queries'
import { find } from 'lodash';
import { AuthenticationError, ValidationError } from 'apollo-server-express';



export const tokenExistence: TokenExistence = async (_p, { token }, { user }) => {
  if (!user) {
    try {
      let recovery = await prisma.recovery({ token });
      if (recovery) {
        return true;
      }
      return false;
    } catch (e) {
      throw new ValidationError(e.toString());
    }
  } else {
    throw new AuthenticationError('already logged in');
  }
}

export const global: Global = async (parent, args, ctx) => {
  let global = await prisma.global({ id: 'global' });
  return { ...global, recovery: undefined };
}
export const branches: Branches = async () => {
  return await prisma.branches();
}
export const validate: Validate = async (parent, args, { user }) => {
  if (user) {
    return user;
  }
  return null;
}
export const campuses: Campuses = async (_, _2, { user }) => {
  if (user && user.level == 1) {
    let campuses = await prisma.campuses({
      where: {
        admin_id: user.username
      }
    });
    return campuses;
  }
  return await prisma.campuses();
}
export const courses: Courses = async (_, { where }, { user }) => {
  if (user && user.level >= 1) {
    return await prisma.courses({
      where: {
        campus: user.campus,
        ...where
      }
    });
  }
  return await prisma.courses({ where });
}
export const questions: Questions = async (_, { where }, { user }) => {
  return await prisma.questions({ where });
}
export const question: Question = async (_, { id }, { bucket }) => {
  let question: QuestionResponse = await prisma.question({ id });
  return new Promise<QuestionResponse>((resolve, reject) => {

    let string = '';
    bucket
      .openDownloadStreamByName(id + '.jpg')
      .on('data', str => {
        string += str.toString('base64');
      })
      .on('end', () => {
        if (question) {
          question.display = `data:image/jpg;base64,${string}`;
          resolve(question);
        }
        reject()
      })
      .on('error', () => {
        resolve(question);
      });
  });
}
export const faculties = async (_, { campus, course }, { user }) => {
  try {
    if (user.level == 0) {
      let faculties = await prisma.users({
        where: {
          level: 3,
          campus
        }
      });
      if (course) {
        let instances = await prisma.courseInstances({ where: { course } });
        faculties = faculties.filter(d => {
          if (find(instances, { facultyID: d.id })) {
            return true;
          }
          return false;
        });
      }
      return faculties;
    }
    if (user.level == 1) {
      let faculties = await prisma.users({
        where: {
          level: 3,
          campus: user.campus
        }
      });
      if (course) {
        let instances = await prisma.courseInstances({ where: { course } });
        faculties = faculties.filter(d => {
          if (find(instances, { facultyID: d.id })) {
            return true;
          }
          return false;
        });
      }
      return faculties;
    }
    if (user.level == 2) {
      let campuses = await prisma.campuses();
      let campus_to_find = user.username.split('-')[2].replace(/_/, ' ');
      let campus = campuses.filter(
        d => d.name.toLowerCase() == campus_to_find
      )[0].name;
      let faculties = await prisma.users({
        where: {
          level: 3,
          campus: campus
        }
      });

      let instances = await prisma.courseInstances({
        where: { course: user.username.replace(/_/, ' ').split('-')[0] }
      });
      console.log(faculties, instances);
      faculties = faculties.filter(d => {
        if (find(instances, { facultyID: d.id })) {
          return true;
        }
        return false;
      });
      return faculties;
    }
    if (user.level == 4) {
      return await prisma.users({
        where: {
          campus: user.campus,
          department: user.department,
          level: 3
        }
      });
    }
  } catch (e) {
    throw new ValidationError(e.toString());
  }
}
export const student = async (_, { id }, { user }) => {
  if (user.level < 4) {
    return await prisma.user({ id });
  } else {
    throw new AuthenticationError('Unauthorized');
  }
}
export const instances = async (_, { where: course }, { user }) => {
  try {
    let where;
    if (course) {
      where = course;
    } else {
      if (user.level == 4) {
        where = {
          studID: user.id
        };
      } else if (user.level == 3) {
        where = {
          facultyID: user.id
        };
      } else if (user.level == 2) {
        let courseUser = user.username.replace(/_/, ' ').split('-')[0];
        where = {
          course: courseUser
        };
      } else if (user.level < 2) {
        where = {
          campus: user.campus
        };
      } else if (user.level == 0) {
        where = {};
      } else {
        throw new AuthenticationError('Unauthorized');
      }
    }
    return await prisma.courseInstances({
      where
    });
  } catch (e) {
    throw new ValidationError(e.toString());
  }
}
export const instance = async (_, { id }) => {
  return await prisma.courseInstance({ id });
}
export const progress = async (_, { where: clientWhere }, { user }) => {
  let where;

  if (user.level == 3) {
    where = {
      facultyID: user.id
    };
  } else if (user.level == 2) {
    let course = user.username.replace(/_/, ' ').split('-')[0];
    let campuses: any = await prisma.campuses();
    let campus_to_find = user.username.split('-')[2].replace(/_/, ' ');
    let campus = campuses.filter(
      d => d.name.toLowerCase() == campus_to_find
    )[0].name;

    campuses.where = {
      course,
      campus
    };
  } else if (user.level == 1) {
    where = {
      campus: user.campus
    };
  } else if (user.level == 0) {
    where = {};
  } else {
    throw new AuthenticationError('Unauthorized');
  }

  return await prisma.courseInstances({
    where: {
      status: true,
      ...where,
      ...clientWhere
    }
  });
}
export const acceptReject = async (_, _arg, { user }) => {
  if (user.level == 3) {
    let inst = await prisma.courseInstances({
      where: {
        status: false,
        facultyID: user.id
      }
    });
    return inst;
  } else {
    throw new AuthenticationError('Unauthorized');
  }
}
export const problems = async (_, _arg, { user }) => {
  if (user.level == 3) {
    console.log(user.id);
    let problems = await prisma.problems({ where: { facultyID: user.id } });

    return problems;
  }
  return await prisma.problems();
}

