const router = require('express').Router();
const controller = require("./searchController");

router.get('/tim-kiem/', controller);

module.exports = router;
