const router = require('express').Router();
const controller = require("./adpController");

router.get('/bai-viet/:articleID/', controller);

module.exports = router;
