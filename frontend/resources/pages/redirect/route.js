const router = require('express').Router();
const controller = require("./controller");

router.get('/chuyen-huong/:variantID/', controller);

module.exports = router;
