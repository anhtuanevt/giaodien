const express = require('express')

const router = express.Router()
const articleController = require('../../controllers/article_controller')
const {upload} = require('../../configs/multer')

router
    .route('/')
    .get(articleController.getArticle)

router
    .route('/form(/:id)?')
    .get(articleController.getArticleById)

router
    .route('/form')
    .post(upload.single('thumbnail'), articleController.addArticle)

router
    .route('/form/:id')
    .post(upload.single('thumbnail'), articleController.updateArticleById)

router
    .route('/form/:id')
    .delete(articleController.deleteArticleById)

router
    .route('/update-status/:status')
    .post(articleController.updateStatus)
   
router
    .route('/upload-photos')
    .post(upload.single('thumbnail'), articleController.uploadPhotos)

router
    .route('/')
    .delete(articleController.deleteArticle)

module.exports = router;