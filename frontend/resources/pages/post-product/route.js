const router = require('express').Router();
const controller = require("./postProductController");

router.get('/dang-san-pham/:variantID/', controller);

module.exports = router;
