const router = require('express').Router();

router.use('/list-of-sellers', require('./api'))
router.use('/seller-catalog', require('./api'))
router.use('/create-order', require('./api'))

module.exports = router;
