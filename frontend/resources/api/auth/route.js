const router = require('express').Router();
const authorizationController = require("./authorizationController");
const loginController = require("./loginController");

// router.get('/login/', loginController);
router.get('/authorization/', authorizationController);

module.exports = router;
