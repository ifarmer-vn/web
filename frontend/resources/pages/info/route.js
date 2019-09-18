const router = require('express').Router();
const controller = require("./infoController");

router.get('/su-menh/', controller);

module.exports = router;
