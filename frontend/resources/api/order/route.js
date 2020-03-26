const router = require('express').Router();
const orderController = require("./orderController");


router.get('/submit-order/', orderController);

module.exports = router;
