import express from "express"
import meCtrl from "./me.controller"
import { authenticateJWT } from '../../utils/jwt';

const MeRouter = express.Router();

MeRouter.get('/', authenticateJWT, meCtrl._getMe);

module.exports = MeRouter;