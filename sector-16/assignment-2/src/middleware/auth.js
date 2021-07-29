const { User } = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer', '').replace(' ', '')
        const decoded = jwt.verify(token, 'israel')
        // console.log(token)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        // console.log(user)

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user

        next()
    } catch (e) {
        // console.log(e)
        res.status(401).send({ error: 'Please authenticate.' })
    }
}



module.exports = { auth }