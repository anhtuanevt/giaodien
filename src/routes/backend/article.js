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
    .put(upload.single('thumbnail'), articleController.updateArticleById)

router
    .route('/form/:id')
    .delete(articleController.deleteArticleById)

router
    .route('/update-status/:status')
    .post(articleController.updateStatus)
   
router
    .route('/update-thumbnail/:id')
    .post(upload.single('file'), articleController.updateThumbnail)

router
    .route('/')
    .delete(articleController.deleteArticle)

module.exports = router;