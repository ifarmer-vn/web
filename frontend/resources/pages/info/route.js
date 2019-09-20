const router = require('express').Router();
const controller = require("./infoController");

router.get('/su-menh/', controller);
router.get('/chinh-sach-quyen-rieng-tu/', controller);

module.exports = router;
