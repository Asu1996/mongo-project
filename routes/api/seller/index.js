const router = require('express').Router();

router.use('/create-catalog', require('./createCatalog'))
router.use('/orders', require('./getOrder'))

module.exports = router;
