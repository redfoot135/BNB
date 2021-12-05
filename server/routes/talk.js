const router = require('express').Router();
const controller = require("../controller");

router.get("/", controller.get_talk);
router.post("/", controller.post_talk);
router.put("/", controller.put_talk);
router.delete("/", controller.delete_talk);

module.exports = router;