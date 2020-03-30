import express from "express"
import BetCtrl from "./bet.controller"
import { authenticateJWT } from '../../utils/jwt';

const BetRouter = express.Router();

BetRouter.get('/', authenticateJWT, BetCtrl._getBets);

BetRouter.get('/:id', authenticateJWT, BetCtrl._getBetsById);

BetRouter.post('/', authenticateJWT, BetCtrl._addBet);

module.exports = BetRouter;