import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { prisma } from '../prisma';
import settings from './settings';
import passport from 'passport';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: settings.secret
};
passport.use(
  'auth',
  new JwtStrategy(opts, async function({ username }: {username: string}, done) {
    try {
      const user = await prisma.user({ username });

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
