const router = require("express").Router();
const validate = require('../middleware/validateBody');
const {validateNewLane, validateUpdateLane} = require('../models/validation');
const validateId = require('../middleware/validateId');
const config = require('config');
const controller = require('./controllers/lanes');


router.get("/", controller.get);

router.get("/:id", controller.getById);

router.post("/", validate(validateNewLane), controller.post);

router.put("/:id",[
  validate(validateUpdateLane),
  validateId(config.get('errors.lanes.errc2'))
], controller.put);

router.delete("/:id", controller.delete);

module.exports = router;