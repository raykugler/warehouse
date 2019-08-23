const router = require("express").Router();
const config = require('config');
const xlsx = require('../middleware/uploadXLS');
const genList = require('../middleware/prepareRoutes');
const valid = require('../middleware/validateBody');
const validateId = require('../middleware/validateId');
const {validateNewRoute, validateUpdateRoute} = require('../models/validation');
const controller = require('./controllers/routes');

router.get("/", controller.get);

router.get("/:id", controller.getById);

router.post('/upload', [xlsx, genList], controller.upload);

router.post("/", [
  valid(validateNewRoute),
  validateId(config.get('errors.routes.errc2'))
], controller.post);

router.put("/:id", valid(validateUpdateRoute), controller.put);

router.delete('/:id', controller.delete);

module.exports = router;