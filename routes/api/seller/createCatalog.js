const router = require('express').Router()
const { addItem, findItem, updateItem } = require('../../../db/utils/mongoApi')

router.post('/', async (req, res, next) => {
  const {
    body: { productsInCatalog },
    userId,
  } = req
  try {
    const exisitngCatalog = await findItem('catalogs', { userId })
    if (exisitngCatalog) {
      await updateItem('catalogs', { userId }, { productsInCatalog })
    } else {
      await addItem('catalogs', { userId, productsInCatalog })
    }
    return res.send({ userId, ...req.body })
  } catch (e) {
    return next(e)
  }
})

module.exports = router

// ADD CHECK IF SOMETHING NOT ENTERED!!
