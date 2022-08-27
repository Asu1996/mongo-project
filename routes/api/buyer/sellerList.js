const router = require('express').Router()
const { findMany } = require('../../../db/utils/mongoApi')

router.get('/', async (req, res, next) => {
  try {
    const sellersList = await findMany('users', { type: 'seller' })
    if (sellersList.length) {
      return res.send({ sellers: sellersList.map(seller => ({ sellerName: seller.userName, sellerId: seller.userId })) })
    }
    return res.send([])
  } catch (e) {
    return next(e)
  }
})

module.exports = router

