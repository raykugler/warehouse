const router = require('express').Router();
const config = require('config');
const validate = require('../middleware/validateBody');
const validateId = require('../middleware/validateId');
const {validateNewMap, validateUpdateMap} = require('../models/validation');
const controller = require('./controllers/maps');

router.get("/current", controller.getCurrent);

router.get("/", controller.get);

router.post("/", validate(validateNewMap), controller.post);

router.put("/:id",[
  validate(validateUpdateMap),
  validateId(config.get('errors.maps.errc3'))
], controller.put);

router.delete("/:id", controller.delete);

module.exports = router;