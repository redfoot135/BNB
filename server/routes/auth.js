const router = require('express').Router();
const controller = require("../controller");

router.post("/login", controller.auth_login);
router.post("/logout", controller.auth_logout);
router.post("/social", controller.auth_social);
router.get("/autoLogin", controller.auth_autoLogin);

module.exports = router;