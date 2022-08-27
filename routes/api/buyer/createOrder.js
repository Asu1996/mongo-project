const router = require('express').Router()
const { uuid: uuidv4 } = require('uuidv4')
const { addItem, findItem } = require('../../../db/utils/mongoApi')

const checkIfValidOrderAndGetTotalPrice = (sellerCatalog, userItems) => {
  const invalidProducts = []
  let totalOrderPrice = 0
  for (const item of userItems) {
    const matchedProduct = sellerCatalog.productsInCatalog.find(
      (product) => product.name.toLowerCase() === item.toLowerCase()
    )
    if (matchedProduct) {
      totalOrderPrice += matchedProduct.price
    } else invalidProducts.push(item)
  }
  return { invalidProducts, totalOrderPrice }
}

router.post('/:seller_id', async (req, res, next) => {
  const {
    params: { seller_id: sellerId },
    body: { selectedItems },
  } = req
  try {
    if (!selectedItems) {
      return res
        .status(400)
        .send({
          success: false,
          message: 'selectedItems is required for order.',
        })
    }
    const sellerCatalog = await findItem('catalogs', { sellerId })
    const {invalidProducts,totalOrderPrice } = checkIfValidOrderAndGetTotalPrice(sellerCatalog, selectedItems)
    if (invalidProducts.length) {
      return res.status(400).send({
        message: `Items not found in seller catalog: ${invalidProducts.join(
          ', '
        )}`,
      })
    }
    const orderData = {
      selectedItems,
      orderId: uuidv4().split('-')[0],
      sellerId,
      totalOrderPrice
    }
    await addItem('orders', orderData)
    return res.send(orderData)
  } catch (e) {
    return next(e)
  }
})

module.exports = router
