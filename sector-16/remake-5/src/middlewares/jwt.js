const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

const validate = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(422).send('Please authenticate!')
    }
    const token = authorization.replace(/Bearer /g, '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    try {

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            return res.status(422).send('Please authenticate!')
        }
        req.user = user
        req.token = token
        next()
    } catch (e) {
        console.log(e.name)
        console.log(e)
        res.status(500).send(e.message)
    }
}


module.exports = {
    validate
}