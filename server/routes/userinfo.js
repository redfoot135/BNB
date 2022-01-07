const router = require('express').Router();
const controller = require("../controller");

router.get("/", controller.get_userinfo);
router.get("/id", controller.get_id);
router.get("/pw", controller.get_pw);
router.post("/", controller.post_userinfo);
router.put("/", controller.put_userinfo);
router.patch("/", controller.patch_userinfo);
router.delete("/", controller.delete_userinfo);
router.post("/connect", controller.post_connect);
router.post("/checkpw", controller.post_checkPW);
router.post("/baby", controller.post_baby);

module.exports = router;