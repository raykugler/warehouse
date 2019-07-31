const express = require("express");
const router = express.Router();
const controller = require('./controllers/home');


router.get("*", controller.get);

router.post("*", controller.post);

router.put("*", controller.put);

router.delete("*", controller.delete);

router.all("*", controller.all);

module.exports = router;