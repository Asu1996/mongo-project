const router = require('express').Router()
const { addItem, findItem, updateItem, findMany } = require('../../../db/utils/mongoApi')

router.get('/', async (req, res, next) => {
  try {
    const sellersList = await findMany('users', { type: 'seller' })
    return res.send({ sellers: sellersList.map(seller => ({ sellerName: seller.userName, sellerId: seller.userId })) })
  } catch (e) {
    return next(e)
  }
})

module.exports = router

// ADD CHECK IF SOMETHING NOT ENTERED!!
