const router = require('express').Router()
const { findItem } = require('../../../db/utils/mongoApi')

router.get('/:seller_id', async (req, res, next) => {
    const { params: { seller_id: sellerId } } = req;
  try {
    const sellerCatalog = await findItem('catalogs', { sellerId })
    return res.send(sellerCatalog)
  } catch (e) {
    return next(e)
  }
})

module.exports = router
