const { OAuth2Client } = require('google-auth-library')
const { wrapAsync, givesError, jwtGiveToken,  generateStringOfNumber } = require('../helpers')
const { User } = require('../models')
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const functions = {
    register: wrapAsync(async (req, res) => {
        let user = await User.create({ ...req.body })
        if (user) {
            res.status(201).json(user)
        } else throw givesError(404, 'user cannot be created')
    }),

    login: wrapAsync(async (req, res) => {
        console.log(req.body)
        let user = await User.findOne({ email: req.body.email }).select('+password')
        
        if (user && user.comparePassword(req.body.password)) {
            user = user.toObject()
            delete user.password;
            let token = jwtGiveToken(user)
            console.log(token)
            res.status(201).json({ user, token })
        }
        else throw givesError(404, 'check your username / password')
    }),

    googleLogin: wrapAsync(async (req, res) => {

        let ticket = await googleClient.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID || 'none'
        })

        if (ticket) {
            let { email, name } = ticket.getPayload()
            let user = await User.findOne({ email })
            if (!user) { user = await User.create({ password: generateStringOfNumber(8), email, name, image: ticket.picture }) }
            let jwt_token = jwtGiveToken(user)
            let response = {
                user: { _id: user._id, email: user.email, },
                token: jwt_token
            }
            console.log(`~~~~~~~~~~~~`)
            console.log(response)
            console.log(`~~~~~~~~~~~~`)
            res.status(201).json(response)
        } else throw givesError(404, 'have you supplied the right google credentials')
    })    
}


module.exports = functions
