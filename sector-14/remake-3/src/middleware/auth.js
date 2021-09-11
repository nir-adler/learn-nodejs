const { User } = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace(/Bearer /g, '')
        // console.log(token)
        const decoded=jwt.verify(token,'israel')
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        // console.log(user)

        if(!user){
            throw new Error()
        }

        req.user=user
        req.token=token

        next()
    } catch (e) {
        res.status(400).send({ error: 'Please validate!' })
    }

}

module.exports = {
    auth
}