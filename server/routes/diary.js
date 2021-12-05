const router = require('express').Router();
const controller = require("../controller");

router.get("/", controller.get_diary);
router.post("/", controller.post_diary);
router.put("/", controller.put_diary);
router.delete("/", controller.delete_diary);

module.exports = router;