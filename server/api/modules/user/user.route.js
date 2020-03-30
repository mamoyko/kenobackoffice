import express from "express"
import passport from 'passport'
import userCtrl from "./user.controller"
import { authenticateJWT } from '../../utils/jwt';
// import { validate } from '../../utils/validate'
// import { newuser, signin } from './user.validations'

const UserRouter = express.Router();

UserRouter.get('/', authenticateJWT, userCtrl._getUsers)

UserRouter.post('/sign_in', userCtrl._signIn)

UserRouter.post('/register', userCtrl._register)

module.exports = UserRouter;