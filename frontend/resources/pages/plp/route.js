const router = require('express').Router();
const controller = require("./plpController");

    router.get('/:categoryID/', controller);

module.exports = router;
