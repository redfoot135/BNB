const router = require('express').Router();
const controller = require("../controller");

router.get("/", controller.get_talk);
router.post("/", controller.post_talk);
router.put("/", controller.put_talk);
router.delete("/", controller.delete_talk);
router.delete("/comment", controller.talkComment.delete_comment);
router.patch("/comment", controller.talkComment.patch_comment);
router.post("/comment", controller.talkComment.post_comment);

module.exports = router;