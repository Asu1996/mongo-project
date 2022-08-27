const router = require('express').Router()
const { addItem, findItem, updateItem, findMany } = require('../../../db/utils/mongoApi')

router.get('/', async (req, res, next) => {
  const {
    userId,
  } = req
  try {
    const exisitngOrders = findMany('orders', { userId })
    return res.send({ exisitngOrders })
  } catch (e) {
    return next(e)
  }
})

module.exports = router

// ADD CHECK IF SOMETHING NOT ENTERED!!
