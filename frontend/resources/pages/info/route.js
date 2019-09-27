const router = require('express').Router();
const controller = require("./infoController");

router.get('/su-menh/', controller);
router.get('/chinh-sach-quyen-rieng-tu/', controller);
router.get('/huong-dan-mua-hang/', controller);
router.get('/in-develop/', controller);

module.exports = router;
