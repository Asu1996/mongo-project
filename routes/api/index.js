const router = require('express').Router();
const { verifyBuyerToken, verifySellerToken } = require('../../middleware/verifyToken')

router.use('/auth', require('./auth'))
router.use('/buyer', [verifyBuyerToken], require('./buyer'))
router.use('/seller', [verifySellerToken],  require('./seller'))

module.exports = router;
