const router = require('express').Router();
const controller = require("./alpController");

    router.get('/danh-muc-bai-viet/:articleCategoryID/', controller);

module.exports = router;
