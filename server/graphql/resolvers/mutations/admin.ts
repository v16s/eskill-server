import { prisma } from '../../../prisma';
import bcrypt from 'bcrypt';
import { promisify } from 'util';
import { AuthenticationError, ValidationError } from 'apollo-server-express';
export const admin = {
  adminDeleteAllCourseInstances__DANGEROUS: async (_p, _a, { user }) => {
    if (user.level > 1) throw new AuthenticationError('Unauthorized');
    return await prisma.deleteManyCourseInstances();
  },
  toggleStudentRegistration: async (p, a, { user }) => {
    if (user.level < 1) {
      try {
        let global = await prisma.global({ id: 'global' });
        await prisma.updateGlobal({
          data: { regs: !global.regs },
          where: { id: 'global' }
        });
        return { result: !global.regs };
      } catch (e) {
        throw new ValidationError(e.toString());
      }
    } else {
      throw new AuthenticationError('Unauthorized');
    }
  },
  toggleFacultyRegistration: async (p, a, { user }) => {
    if (user.level < 1) {
      try {
        let global = await prisma.global({ id: 'global' });
        await prisma.updateGlobal({
          data: { regf: !global.regf },
          where: { id: 'global' }
        });
        return { result: !global.regs };
      } catch (e) {
        throw new ValidationError(e.toString());
      }
    } else {
      throw new AuthenticationError('Unauthorized');
    }
  },
  addCampus: async (parent, { name }, { user }) => {
    return new Promise(async (resolve, reject) => {
      if (user.level > 1) reject(new AuthenticationError('Unauthorized'));
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash('password', salt);
        let { username } = await prisma.createUser({
          username: `${name.replace(/ /g, '_')}-Admin`,
          password: hash,
          name: `${name} Admin`,
          campus: name,
          email: '',
          level: 1
        });
        const { defaultCourses }: any = await prisma.global({ id: 'global' });
        Promise.all(
          defaultCourses.map(async d => {
            let branches = await prisma.branches({ where: { name: d.branch } });
            if (branches.length == 0) {
              await prisma.createBranch({ name: d.branch }).catch(e => {});
            }
            let identity = `${d.name}-${d.branch}-${username
              .split('-')[0]
              .toLowerCase()}`;
            const cSalt = await bcrypt.genSalt(10);
            const cHash = await bcrypt.hash('password', salt);
            let { username: coordinator_id } = await prisma.createUser({
              username: `${identity.replace(/ /g, '_')}-coordinator`,
              password: cHash,
              name: `${identity} Coordinator`,
              email: '',
              level: 2,
              campus: name
            });
            return await prisma.createCourse({
              ...d,
              coordinator_id,
              campus: name
            });
          })
        ).then(async courses => {
          resolve(await prisma.createCampus({ name, admin_id: username }));
        });
      } catch (e) {
        reject(new ValidationError(e.toString()));
      }
    });
  },
  removeCampus: async (parent, { name }, { user }) => {
    if (user.level < 1) {
      try {
        let { admin_id } = await prisma.campus({ name });
        await prisma.deleteUser({ username: admin_id });
        await prisma.deleteManyCourses({ campus: name });
        await prisma.deleteManyUsers({ campus: name });
        return await prisma.deleteCampus({ name });
      } catch (e) {
        console.log(e);
        throw new ValidationError(e.toString());
      }
    } else {
      throw new AuthenticationError('Unauthorized');
    }
  },
  updateCampus: async (parent, { name, newName }, { user }) => {
    if (user.level < 1) {
      try {
        let { username } = await prisma.updateUser({
          where: { username: `${name.replace(/ /g, '_')}-Admin` },
          data: {
            username: `${newName.replace(/ /g, '_')}-Admin`,
            name: `${newName} Admin`,
            campus: newName
          }
        });
        return await prisma.updateCampus({
          where: { name },
          data: { name: newName }
        });
      } catch (e) {
        console.log(e);
        throw new ValidationError(e.toString());
      }
    } else {
      throw new AuthenticationError('Unauthorized');
    }
  },
  addCourse: async (parent, { name, branch }, { user }) => {
    return new Promise(async (resolve, reject) => {
      if (user.level < 1) {
        try {
          let branches = await prisma.branches({ where: { name: branch } });
          if (branches.length == 0) {
            await prisma.createBranch({ name: branch });
          }
          let campuses = await prisma.campuses();
          Promise.all(
            campuses.map(async ({ admin_id, name: campus_name }) => {
              let identity = `${name}-${branch}-${admin_id
                .split('-')[0]
                .toLowerCase()}`;
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash('password', salt);
              let { username } = await prisma.createUser({
                username: `${identity.replace(/ /g, '_')}-coordinator`,
                password: hash,
                name: `${identity} Coordinator`,
                email: '',
                level: 2,
                campus: campus_name
              });
              await prisma.createCourse({
                name,
                coordinator_id: username,
                branch,
                automated: false,
                campus: campus_name
              });
            })
          ).then(data => {
            resolve({ count: campuses.length });
          });
        } catch (e) {
          reject(new ValidationError(e.toString()));
        }
      } else {
        reject(new AuthenticationError('Unauthorized'));
      }
    });
  },

  removeCourse: async (parent, { name, campus }, { user }) => {
    if (user.level < 1) {
      try {
        let courses_raw = await prisma.courses({
          where: { name, campus }
        });
        let { coordinator_id, branch } = courses_raw[0];
        let courses = await prisma.courses({ where: { branch } });
        if (courses.length == 1) {
          await prisma.deleteBranch({ name: branch });
        }
        console.log(
          await prisma.deleteManyCourses({
            name,
            campus
          })
        );
        try {
          let a = await prisma.deleteUser({ username: coordinator_id });
        } catch (e) {}
        return courses_raw[0];
      } catch (e) {
        console.log(e);
        throw new ValidationError(e.toString());
      }
    } else {
      throw new AuthenticationError('Unauthorized');
    }
  },

  updateCourse: async (
    parent,
    { name, newName, branch, newBranch, campus },
    { user }
  ) => {
    if (user.level < 1) {
      try {
        let courses = await prisma.courses({ where: { branch } });
        if (courses.length == 1) {
          await prisma.deleteBranch({ name: branch });
        }
        let branches = await prisma.branches({ where: { name: newBranch } });
        if (branches.length == 0) {
          await prisma.createBranch({ name: newBranch });
        }
        let course: any = await prisma.courses({
          where: { campus, name, branch }
        });
        course = course[0];
        let identity = course.coordinator_id;
        let iden_raw = identity.split('-').slice(0, -1);
        iden_raw[0] = newName;
        iden_raw[1] = newBranch;
        let iden = iden_raw.join('-');
        await prisma.updateUser({
          where: { username: identity },
          data: {
            username: course.coordinator_id,
            name: `${iden} Coordinator`
          }
        });
        await prisma.updateManyCourses({
          where: { name, campus },
          data: { name: newName, branch: newBranch }
        });
        return course;
      } catch (e) {
        throw new ValidationError(e.toString());
      }
    } else {
      throw new AuthenticationError('Unauthorized');
    }
  },

  addDepartment: async (parent, { tag, name }, { user }) => {
    if (user.level < 1) {
      try {
        return await prisma.updateCampus({
          where: { name },
          data: {
            departments: {
              create: [tag]
            }
          }
        });
      } catch (e) {
        console.log(e);
        throw new ValidationError(e);
      }
    } else {
      throw new AuthenticationError('Unauthorized');
    }
  },

  removeDepartment: async (parent, { id, name }, { user }) => {
    if (user.level < 1) {
      try {
        console.log(id, name);
        return await prisma.updateCampus({
          where: { name },
          data: {
            departments: {
              deleteMany: { name: id }
            }
          }
        });
      } catch (e) {
        console.log(e);
        throw new ValidationError(e.toString());
      }
    } else {
      throw new AuthenticationError('Unauthorized');
    }
  },

  updateDepartment: async (parent, { name, update: updateMany }, { user }) => {
    if (user.level < 1) {
      try {
        return await prisma.updateCampus({
          where: { name },
          data: {
            departments: {
              updateMany
            }
          }
        });
      } catch (e) {
        console.log(e);
        throw new ValidationError(e.toString());
      }
    } else {
      throw new AuthenticationError('Unauthorized');
    }
  },
  addDefaultCourse: async (_parent, { name, branch }, { user }) => {
    if (!user || user.level > 0) throw new AuthenticationError('Unauthorized');
    const global = await prisma.updateGlobal({
      where: { id: 'global' },
      data: {
        defaultCourses: {
          create: [{ name, branch }]
        }
      }
    });
    console.log(global);
    return global.defaultCourses;
  },
  removeDefaultCourse: async (_parent, { name }, { user }) => {
    if (!user || user.level > 0) throw new AuthenticationError('Unauthorized');
    const global = await prisma.updateGlobal({
      where: { id: 'global' },
      data: {
        defaultCourses: {
          deleteMany: { name }
        }
      }
    });
    return global.defaultCourses;
  },
  updateDefaultCourse: async (
    _parent,
    { name, newName, branch, newBranch },
    { user }
  ) => {
    if (!user || user.level > 0) throw new AuthenticationError('Unauthorized');
    const global = await prisma.updateGlobal({
      where: { id: 'global' },
      data: {
        defaultCourses: {
          updateMany: {
            where: { name, branch },
            data: { name: newName, branch: newBranch }
          }
        }
      }
    });
    return global.defaultCourses;
  },
  toggleDefaultCourse: async (_p, { name, action }, { user }) => {
    if (!user || user.level > 0) throw new AuthenticationError('Unauthorized');
    const global = await prisma.updateGlobal({
      where: { id: 'global' },
      data: {
        defaultCourses: {
          updateMany: {
            where: { name },
            data: { automated: !action }
          }
        }
      }
    });
    return global.defaultCourses;
  },
  reverify: async (_p, _a, { user }) => {
    return new Promise(async (resolve, reject) => {
      if (user.length > 1) reject('Unauthorized');
      let instances = await prisma.courseInstances();
      Promise.all(
        instances.map(async instance => {
          const { questions, id }: any = instance;
          const correctArray = questions.filter(d => d.status == 2);
          const correct = correctArray.length;
          return await prisma.updateCourseInstance({
            where: { id },
            data: { correct }
          });
        })
      )
        .then(e => {
          resolve(instances.length);
        })
        .catch(e => {
          reject(e.toString());
        });
    });
  }
};
