import { prisma } from '../../../prisma';
import bcrypt from 'bcrypt';
import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { Forgot, Recover, Login, Register } from '../../../typings/user';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreplysrmeskill@gmail.com',
    pass: 'srmeskillnoreply'
  }
});

function makeid(length: number) {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const forgot: Forgot = async (_p, { username }, { user }) => {
  if (!user) {
    try {
      const user = await prisma.user({ username });
      if (user) {
        const { email } = user;
        let token;
        const recovery = await prisma.recoveries({
          where: { username, email }
        });
        if (recovery.length < 1) {
          token = makeid(12);
          await prisma.createRecovery({
            token,
            username,
            email
          });
        } else {
          token = recovery[0].token;
        }
        await prisma.createRecovery;
        const resetURL = 'http://care.srmist.edu.in/eskill/forgot/';
        transporter.sendMail({
          from: 'noreplysrmeskill@gmail.com',
          to: email,
          subject: 'eSkill Password Reset',
          html: `<p>Dear ${username}</p><p>In Order to reset the password, please click the link below: </p><p><a href="${resetURL}${token}">Reset Password</a></p>`
        });
        return true;
      } else {
        throw new ValidationError('Email is No');
      }
    } catch (e) {
      throw new ValidationError(e.toString());
    }
  } else {
    throw new AuthenticationError('already logged in');
  }
};
export const recover: Recover = async (_p, { input }, { user }) => {
  if (!user) {
    const { token, password } = input;
    const { username } = await prisma.recovery({ token });
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt, null);
    const updatedUser = await prisma.updateUser({
      where: {
        username
      },
      data: {
        password: hash
      }
    });
    let jwToken = jwt.sign(updatedUser, 'eskill@care');
    await prisma.deleteRecovery({ token });
    return {
      ...updatedUser,
      jwt: `Bearer ${jwToken}`
    };
  } else {
    throw new AuthenticationError('already logged in!');
  }
};
export const login: Login = async (parent, { user }, ctx, info) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dbuser = await prisma.user({ username: user.username });
      if (!dbuser) {
        reject(new AuthenticationError('no user'));
      }
      bcrypt.compare(user.password, dbuser.password, (err, isMatch) => {
        if (isMatch) {
          let token = jwt.sign(dbuser, 'eskill@care');
          resolve({ ...dbuser, jwt: `Bearer ${token}` });
        }
        reject(new AuthenticationError('wrong password'));
      });
    } catch (e) {
      reject('error');
    }
  });
};
export const register: Register = async (parent, { user }, ctx, info) => {
  return new Promise(async (resolve, reject) => {
    try {
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(user.password, salt, null);
      let dbuser = await prisma.createUser({
        ...user,
        type: undefined,
        level: user.type ? 3 : 4,
        password: hash
      });
      let token = jwt.sign(dbuser, 'eskill@care');
      resolve({ ...dbuser, jwt: `Bearer ${token}` });
    } catch (e) {
      reject(e);
    }
  });
};
