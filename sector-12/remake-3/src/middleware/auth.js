const jwt = require('jsonwebtoken')
const { User } = require('../models/user')


const auth = async (req, res, next) => {

    try {
        // console.log(req.header('Authorization').replace('Bearer', '').replace(' ', ''))
        const token = req.header('Authorization').replace('Bearer', '').replace(' ', '')
        // console.log(token)
        const decoded = jwt.verify(token, 'telaviv')
        
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        // console.log(user)
        if (!user) {
            throw new Error('User id not found!')
        }
        req.user = user
        req.token = token

        next()
    } catch (e) {
        // console.log(e)
        res.status(401).send({ error: 'Please authenticate.' })
    }
}


module.exports = {
    auth
}