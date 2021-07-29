const { User } = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

    try {
        // console.log(req.headers)
        const token = req.header('Authorization').replace('Bearer', '').replace(' ', '')
        // console.log(token)
        // console.log(process.env.JWT_SECRET)
        // console.log(jwt.verify(token,'israel'))
      

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
       
       
        const user = await User.findOne({ _id: decoded._id.toString() }), 'tokens.token': token })
       

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