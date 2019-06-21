const { wrapAsync, givesError, jwtGiveToken, jwtVerifyToken, generateStringOfNumber } = require('../helpers')
const { Article, User } = require('../models')
const functions = {
    authenticate: wrapAsync(async (req, res, next) => {
        let token = jwtVerifyToken(req.headers.token)
        // console.log(token)
        let user = await User.findOne({ _id: token._id })
        if (user) {
            req.user = user
            next()
        }
        else {
            next(givesError(401, 'bad token, no such user'))
        }
    }),

    authorizeOnGif: wrapAsync(async (req, res, next) => {
        console.log('~~~~~~~~~~~')
        console.log(req.body.gif)
        console.log('~~~~~~~~~~~')
        if (req.user.gifs.find(g => g === req.body.gif)) {
            next()
        }
        else {
            next(givesError(403, 'you are not the owner  of this gif'))
        }
    }),
}


module.exports = functions
