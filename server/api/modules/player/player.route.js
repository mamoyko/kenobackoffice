import express from "express"
import passport from 'passport'
import playerCtrl from "./player.controller"
import { authenticateJWT } from '../../utils/jwt';
// import { validate } from '../../utils/validate'
// import { newuser, signin } from './user.validations'

const PlayerRouter = express.Router();

PlayerRouter.get('/', authenticateJWT, playerCtrl._getPlayer);

PlayerRouter.get('/:id', authenticateJWT, playerCtrl._getPlayerById);

PlayerRouter.get('/affiliate/:id', playerCtrl._getPlayerByAffiliate)

PlayerRouter.post('/register', playerCtrl._addPlayer);

PlayerRouter.patch('/', authenticateJWT, playerCtrl._updatePlayer);

PlayerRouter.delete('/:id', authenticateJWT, playerCtrl._deletePlayer);

PlayerRouter.post('/login', playerCtrl._signInPlayers);

// UserRouter.delete('/', authenticateJWT, playerCtrl._deletePlayer);

module.exports = PlayerRouter;