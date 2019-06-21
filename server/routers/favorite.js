const router = require('express').Router();
const {addFavorite,deleteFavorite} = require('../controllers/fav')
const {authorizeOnGif} = require('../middlewares/auth')
const {sendUploadToGCS,fromBase64toFile} = require('../helpers/image-utility')

router.post('/', fromBase64toFile, sendUploadToGCS, addFavorite)
// router.delete('/', authorizeOnGif, deleteFavorite)
router.delete('/',  deleteFavorite)

module.exports = router