import { prisma } from "../../../prisma";
import { AuthenticationError, ValidationError } from "apollo-server-express";
import bcrypt from "bcrypt";
export const global = {
  toggleCourseAutomation: async (
    _p,
    { name, campus: providedCampus },
    { user: { level, campus } }
  ) => {
    if (level <= 1) {
      if (level == 1) {
        providedCampus = campus;
      }
      try {
        const courses = await prisma.courses({
          where: { name, campus: providedCampus },
        });
        let { automated } = courses[0];
        await prisma.updateManyCourses({
          where: { name, campus: providedCampus },
          data: {
            automated: !automated,
          },
        });
        return courses[0];
      } catch (e) {
        console.log(e);
        throw new ValidationError(e.toString());
      }
    } else {
      throw new AuthenticationError("Unauthorized");
    }
  },
  resetPassword: async (_p, { username, password }, { user }) => {
    if (user.level != 3) throw new AuthenticationError("Unauthorized");
    try {
      let fetchUser = await prisma.user({ username });
      let level = fetchUser.level;
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(password, salt);
      if (user.level < level) {
        fetchUser = await prisma.updateUser({
          where: { username },
          data: { password: hash },
        });
        return fetchUser;
      }
    } catch (e) {
      throw new ValidationError(e.toString());
    }
  },
};
