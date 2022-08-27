const router = require('express').Router()
const { addItem, findItem, updateItem, findMany } = require('../../../db/utils/mongoApi')

router.get('/:seller_id', async (req, res, next) => {
    const { params: { seller_id: sellerId } } = req;
  try {
    const sellerCatalog = await findItem('catalogs', { userId: sellerId })
    return res.send(sellerCatalog)
  } catch (e) {
    return next(e)
  }
})

module.exports = router

// ADD CHECK IF SOMETHING NOT ENTERED!!
