const router = require('express').Router()
const auth = require('../controllers/auth')


// router.use('/',(rq,rs)=>rs.send(`success`))
router.post('/login', auth.login)
// router.post('/google-login', auth.googleLogin)
router.post('/register', auth.register)

module.exports = router