const router = require('express').Router()
const { findMany } = require('../../../db/utils/mongoApi')

router.get('/', async (req, res, next) => {
  const {
    userId: sellerId,
  } = req
  try {
    const exisitngOrders = await findMany('orders', { sellerId })
    return res.send({ orders: exisitngOrders })
  } catch (e) {
    return next(e)
  }
})

module.exports = router
