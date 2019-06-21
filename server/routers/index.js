const router = require('express').Router();
const favoriteRouter = require('./favorite')
const authRouter = require('./auth')
const { authenticate } = require('../middlewares/auth')
const { sendUploadToGCS, fromBase64toFile } = require('../helpers/image-utility')

router.use('/auth', authRouter)

router.use(authenticate)

router.put('/user', fromBase64toFile, sendUploadToGCS, (req, res, next) => {
    if (req.file.cloudStoragePublicUrl) { req.user.imageURL = req.file.cloudStoragePublicUrl }
    
    Object.keys(req.body).forEach(key => {
        req.user[key] = req.body[key]
    })
    req.user.save().then(user => {
        req.json(user)
    }).catch(next)

})
router.use('/fav', favoriteRouter)

module.exports = router