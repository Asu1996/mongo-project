const verifyBuyerToken = (req, res, next) => {
    const { authtoken } = req.headers

    if (!authtoken) {
        return res.status(400).send({ message: 'authtoken is not provided.' })
    }

    const [ userName, password, type ] = authtoken.split('&')

    if (type !== 'buyer') {
        return res.status(401).send({ message: 'Only buyer allowed with this Api' })
    }

    req.userId = `${type}-${userName}`
    return next()
}

const verifySellerToken = (req, res, next) => {
    const { authtoken } = req.headers

    if (!authtoken) {
        return res.status(400).send({ message: 'authtoken is not provided.' })
    }

    const [ userName, password, type ] = authtoken.split('&')

    if (type !== 'seller') {
        return res.status(401).send({ message: 'Only seller allowed with this Api' })
    }

    req.userId = `${type}-${userName}`
    return next()
}

module.exports = { verifyBuyerToken, verifySellerToken }
