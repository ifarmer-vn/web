const router = require('express').Router();
const controller = require("./controller");

router.get('/order/:variantID/', controller);

module.exports = router;
