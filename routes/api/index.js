const router = require('express').Router();

router.use('/auth', require('./auth'))
router.use('/buyer', require('./buyer'))
router.use('/seller', require('./seller'))

module.exports = router;
