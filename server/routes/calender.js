const router = require('express').Router();
const controller = require("../controller");

router.get("/", controller.get_calender);
router.post("/", controller.post_calender);
router.put("/", controller.put_calender);
router.delete("/", controller.delete_calender);

module.exports = router;