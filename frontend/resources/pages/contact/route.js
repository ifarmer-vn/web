const router = require('express').Router();
const controller = require("./contactController");

router.get('/lien-he/', controller);

module.exports = router;
