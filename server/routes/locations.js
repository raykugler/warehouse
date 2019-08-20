const router = require("express").Router();
const config = require('config');
const validate = require('../middleware/validateBody');
const validateId = require('../middleware/validateId');
const {validateNewLocation, validateUpdateLocation} = require('../models/validation');
const controller = require('./controllers/locations');


router.get('/', controller.get);

router.get('/:id', controller.getById);

router.post('/', validate(validateNewLocation), controller.post);

router.put('/:id', [
  validate(validateUpdateLocation),
  validateId(config.get('errors.locations.errc2'))
], controller.put);

router.delete('/:id', controller.delete);

module.exports = router;