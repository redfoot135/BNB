const router = require('express').Router();
const controller = require("../controller");

router.get("/", controller.get_calendar);
router.post("/", controller.post_calendar);
router.patch("/", controller.patch_calendar);
router.delete("/", controller.delete_calendar);

module.exports = router;