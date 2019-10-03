const router = require('express').Router();
const controller = require("./postProductController");

router.get('/dang-san-pham/', controller);

module.exports = router;
