const verifyBuyerToken = (req, res, next) => {
    const { authtoken } = req.body

    const [ userName, password, type ] = authtoken.split('&')

    if (type !== 'buyer') {
        return res.status(401).send({ message: 'Seller not allowed with this Api' })
    }

    req.userId = `${type}-${userName}`
    return next()
}

const verifySellerToken = (req, res, next) => {
    const { authtoken } = req.body

    const [ userName, password, type ] = authtoken.split('&')

    if (type !== 'seller') {
        return res.status(401).send({ message: 'Buyer not allowed with this Api' })
    }

    req.userId = `${type}-${userName}`
    return next()
}

module.exports = { verifyBuyerToken, verifySellerToken }
