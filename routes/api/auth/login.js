const router = require('express').Router()
const { findItem } = require('../../../db/utils/mongoApi')

router.post('/', async (req, res, next) => {
  const { body: { userName, password, type } } = req
  try {
    if (!userName || !password || !type) {
      return res.status(400).send({ success: false, message: 'userName, password and type is required!' })
    }
    if (type !== 'buyer' && type !== 'seller') {
        return res.status(400).send({ success: false, message: `type should be 'buyer' or 'seller'` })
    }
    const userDocIfExists = await findItem('users', { userName: userName.toLowerCase(), type, password })
    if (!userDocIfExists) {
        return res.status(400).send({ message: `userName or password or type is incorrect!` })
    }
    return res.send({ message: 'login successful', authtoken: userDocIfExists.authtoken})
  } catch (e) {
    return next(e)
  }
})

module.exports = router
