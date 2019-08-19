const router = require("express").Router();
const validate = require('../middleware/validateBody');
const controller = require('./controllers/lanes');


router.get("/", controller.get);

router.get("/:id", controller.getById);

router.post("/", controller.post);

router.put("/:id", controller.put);

router.delete("/:id", controller.delete);

module.exports = router;