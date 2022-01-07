const router = require('express').Router();
const controller = require("../controller");

router.get("/", controller.get_diary);
router.post("/", controller.post_diary);
router.patch("/", controller.patch_diary);
router.delete("/", controller.delete_diary);
router.post("/comment", controller.diaryComment.post_comment);
router.patch("/comment", controller.diaryComment.patch_comment);
router.delete("/comment", controller.diaryComment.delete_comment);

module.exports = router;