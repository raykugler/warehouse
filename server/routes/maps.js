const router = require("express").Router();
const validate = require('../middleware/validateBody');
const {validateMap} = require('../models/validation');
const controller = require('./controllers/maps');

router.get("/current", controller.getCurrent);

router.get("/", controller.get);

router.post("/", validate(validateMap), controller.post);

router.put("/:id", controller.put);

router.delete("/:id", controller.delete);

module.exports = router;