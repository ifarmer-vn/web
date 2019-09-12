var router = require('express').Router();
const controller = require("./pdpController");

router.get('/san-pham/:productID/', controller);

module.exports = router;
