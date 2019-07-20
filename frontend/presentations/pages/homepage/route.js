var router = require('express').Router();
const controller = require("./homepageController");

router.get('/', controller);

module.exports = router;
