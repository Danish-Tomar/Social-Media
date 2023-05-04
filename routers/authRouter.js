const router = require("express").Router();
const routerAuth = require("../controller/authController");

router.post("/signup", routerAuth.singupContoller);
router.post("/login", routerAuth.loginController);
router.get("/refresh", routerAuth.refreshAccessTokenController);
router.post('/logout',routerAuth.logoutController)
module.exports = router;
