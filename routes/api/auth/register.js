const router = require('express').Router()
const { addItem, findItem } = require('../../../db/utils/mongoApi')

router.post('/', async (req, res, next) => {
  const { body: { userName, password, type } } = req
  try {
    if (!userName || !password || !type) {
      return res.status(400).send({ success: false, message: 'userName, password and type is required!' })
    }
    if (type !== 'buyer' && type !== 'seller') {
        return res.status(400).send({ success: false, message: `type should be 'buyer' or 'seller'` })
    }
    const userDocIfExists = await findItem('users', { userName: userName.toLowerCase(), type })
    if (userDocIfExists) {
        return res.status(400).send({ success: false, message: `User ${userName} already exists!` })
    }
    await addItem('users', { ...req.body, authtoken: `${userName}&${password}&${type}`, userId: `${type}-${userName}` })
    return res.send({ success: true })
  } catch (e) {
    return next(e)
  }
})

module.exports = router
