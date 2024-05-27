const express = require('express')

const router = express.Router()
const categoryController = require('../../controllers/category_controller')
const validator = require('../../untils/validator')

router
    .route('/')
    .get(categoryController.getCategory)

router
    .route('/form/:id')
    .post(categoryController.updateCategoryById)

router
    .route('/form(/:id)?')
    .get(categoryController.getCategoryById)

router
    .route('/form')
    .post(categoryController. addCategory)

router
    .route('/form/:id')
    .delete(categoryController.deleteCategoryById)

router
    .route('/update-multi-status/:status')
    .post(categoryController.updateMultiStatus)

router
    .route('/update-single-status')
    .post(categoryController.updateSingleStatus)

router
    .route('/update-ordering')
    .post(categoryController.updateOrdering)

router
    .route('/')
    .delete(categoryController.deleteCategory)

router
    .route('/delete/:id')
    .get(categoryController.deleteCategoryById)

module.exports = router;