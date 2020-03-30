import passport from 'passport'
import { Strategy  as LocalStrategy } from 'passport-local'
import UserModel from '../api/modules/user/user.model';

passport.use(new LocalStrategy({ 
  usernameField: 'email', 
  passwordField: 'password'
},
async (username, password, done) => {
  let user = await UserModel.findOne({email:username});
  if (!user){
    return done(null, false, {message: 'Unknown User'});
  }
  let isMatch = await user.matchPasswords(password)
  if (!isMatch){
    return done(null, false, { message : 'invalid password' })
  }
  return done(null, user);
}
));