const router = require('express').Router();
const controller = require("../ controller");

router.post("/", controller.post_userinfo);
router.put("/", controller.put_userinfo);
router.delete("/", controller.delete_userinfo);

module.exports = router;