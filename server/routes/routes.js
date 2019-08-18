const router = require("express").Router();
const xlsx = require('../middleware/uploadXLS');
const validateRoutes = require('../middleware/validateRoutes');
const genList = require('../middleware/prepareRoutes');
const valid = require('../middleware/validateBody');
const {validateRoutesArray} = require('../models/validation');
const controller = require('./controllers/routes');

router.get("/", controller.get);

router.post('/upload', [xlsx, genList], controller.upload);

router.post("/", [
  validateRoutes,
  valid(validateRoutesArray, 'routes', 'values')
], controller.post);

router.put("/", controller.put);

router.delete('/', controller.delete);

module.exports = router;