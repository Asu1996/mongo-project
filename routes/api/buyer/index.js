const router = require('express').Router();

router.use('/list-of-sellers', require('./sellerList'))
router.use('/seller-catalog', require('./sellerCatalog'))
router.use('/create-order', require('./createOrder'))

module.exports = router;
