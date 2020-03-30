import passport from 'passport'
import UserModel from './user.model';
import { getJWTFunc } from '../../utils/jwt'

class UsersController {
    

  _getUsers = async (req,res,next) => {
      let data = await UserModel.find({});
      res.json({
        data: data
      })
  }

    _register = async (req,res,next) => {
        try {
            let data = await UserModel.create(req.body.user);
            let user = data.toObject()
            res.json({
                data : user 
            })
        } catch(err){
            console.log(err)
            res.json({
                message : "error in api register"
            })
        }
    }

    _signIn = async (req, res, next) => {
        passport.authenticate("local", { session: false }, (err, user, info) => {
            if (err || !user) {
              return res.json({ message: info.message, result: user });
            }
            req.login(user, { session: false }, err => {
              if (err) {
                res.send(err);
              }
              let token = getJWTFunc(user)
              res.json({
                accessToken : token
              })

            });
          })(req, res);
    };
}


export default new UsersController();