const router = require('express').Router()
const { addItem, findItem, updateItem } = require('../../../db/utils/mongoApi')

router.post('/', async (req, res, next) => {
  const {
    body: { productsInCatalog },
    userId: sellerId,
  } = req
  try {
    if (!productsInCatalog) {
      return res.status(400).send({ success: false, message: 'productsInCatalog key is required.' })
    }
    const exisitngCatalog = await findItem('catalogs', { sellerId })
    if (exisitngCatalog) {
      await updateItem('catalogs', { sellerId }, { productsInCatalog })
    } else {
      await addItem('catalogs', { sellerId, productsInCatalog })
    }
    return res.send({ sellerId, ...req.body })
  } catch (e) {
    return next(e)
  }
})

module.exports = router

