const { wrapAsync, givesError } = require('../helpers')
const { Article } = require('../models')
const { deleteFromBucket } = require('../helpers/image-utility')
const logz = k => { console.log(`~~~~~logz~~~~~~~`); console.log(k); console.log(`~~~~~~~~~~~~~~~~~~~`) }
const path = `https://storage.googleapis.com/mwp-portofolio/giffun-`

const functions = {
    //call this after authentication 
    addFavorite: wrapAsync(async function (req, res) {
      console.log(req.file)
      if (req.file && req.file.cloudStoragePublicUrl) {
        let newImage = req.file.cloudStoragePublicUrl
        // console.log(newImage)
        // let newName  = newImage.lastIndexOf('/')
        req.user.gifs.addToSet(newImage)
        let user = await req.user.save()
        if(user){
          res.json({new: newImage , saved:true})
        }      

      } else throw givesError(400,'cannot read new image')
    }),
    getFavorites:wrapAsync(async function (req, res) {
      res.json(req.user.gifs)
    }),

    deleteFavorite: wrapAsync(async function (req, res) {

        let deletedImage = req.body.gif
        // let fileName = deletedImage.substring(deletedImage.lastIndexOf('/'))
        req.user.gifs.pull(deletedImage)
        let user = await req.user.save()
        if(user){
            let fileName = deletedImage.substring(deletedImage.lastIndexOf('/'))
            deleteFromBucket(fileName);
            res.send({deleted:deletedImage, deleted:true})
        }
      }),


    // GetHomeArticles: wrapAsync(async function (req, res) {
    //     let search = {}
    //     let articles = await Article.find(search)
        
    //     if (articles.length > 0) res.json(articles);
    //     else res.status(200).json([])
    // }),
    // Get: wrapAsync(async function (req, res) {
    //     let articles = await Article.find({ author: req.user._id })
    //     if (articles.length > 0) res.json(articles);
    //     else res.status(200).json([])
    // }),
    // GetOne: wrapAsync(async function (req, res) {
    //     console.log(req.params)
    //     let user = await Article.findById(req.params.id)
    //     if (user) res.json(user)
    //     else res.status(200).json({})
    // }),
    // GetMyArticles: wrapAsync(async function (req, res) {
    //     let search = { author: req.user }
    //     let articles = await Article.find(search)
    //     // logz(articles);
    //     if (articles.length > 0) res.json(articles);
    //     else res.status(200).json([])
    // }),
    // Post: wrapAsync(async function (req, res) {
    //     let { author, title, content, created_at, tags } = req.body

    //     let newArticle = await new Article({ author, title, content, created_at, featured_image: req.file.cloudStoragePublicUrl, tags }).save()
    //     if (newArticle) res.status(201).json(newArticle)
    //     else throw givesError(404, `article cannot be created, check your parameter`)
    // }),
    // Patch: wrapAsync(async function (req, res) {
    //     let values = { ...req.body }
    //     if (req.file && req.file.cloudStoragePublicUrl) { values.featured_image = req.file.cloudStoragePublicUrl }

    //     Object.keys(values).forEach(key => {
    //         req.article[key] = values[key]
    //     })
    //     let updateData = await req.article.save()
    //     if (updateData) res.status(200).json({ ...updateData, msg: `data with id ${req.params.id} updated ` })
    //     else throw givesError(404, `data with id of ${req.params.id}`)
    // }),
    // Delete: wrapAsync(async function (req, res) {

    //     let tobeDeleted = req.article
    //     let image = tobeDeleted.featured_image
    //     let fileName = image.substring(image.lastIndexOf('/'))

    //     let delStatus = await Article.deleteOne({ _id: tobeDeleted._id })
    //     // await
    //     deleteFromBucket(fileName);
        
    //     if ((await tobeDeleted.remove()).$isDeleted()) res.json(tobeDeleted)
    // })
}


module.exports = functions



