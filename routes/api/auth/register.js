const router = require('express').Router()
const { addItem, findItem } = require('../../../db/utils/mongoApi')

router.post('/', async (req, res, next) => {
  const { body: { userName, password, type } } = req
  try {
    if (type !== 'buyer' && type !== 'seller') {
        return res.status(400).send({ message: `type should be 'buyer' or 'seller'` })
    }
    const userDocIfExists = await findItem('users', { userName: userName.toLowerCase(), type })
    if (userDocIfExists) {
        return res.status(400).send({ message: `User ${userName} already exists!` })
    }
    await addItem('users', { ...req.body, authtoken: `${userName}&${password}&${type}`, userId: `${type}-${userName}` })
    return res.send(req.body)
  } catch (e) {
    return next(e)
  }
})

module.exports = router

// ADD CHECK IF SOMETHING NOT ENTERED!!