import express from "express"

import UserRoutes from "./user/user.route";
import playerRoute from "./player/player.route";
import meRoutes from "./me/me.route";
import betRoutes from "./bet/bet.routes";

const router = express.Router(); // eslint-disable-line new-cap

router.use('/users', UserRoutes);
router.use('/players',playerRoute);
router.use('/me', meRoutes);
router.use('/bet', betRoutes)

module.exports = router;