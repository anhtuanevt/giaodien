const express = require('express')

const router = express.Router()
const contactController = require('../../controllers/contact_controller')
const validator = require('../../untils/validator')

router
    .route('/')
    .get(contactController.getContact)

router
    .route('/form(/:id)?')
    .get(contactController.getContactById)

router
    .route('/form')
    .post(contactController.addContact)

router
    .route('/form/:id')
    .post(contactController.updateContactById)

// router
//     .route('/form/:id')
//     .delete(categoryController.deleteCategoryById)

// router
//     .route('/update-multi-status/:status')
//     .post(categoryController.updateMultiStatus)

// router
//     .route('/update-single-status')
//     .post(categoryController.updateSingleStatus)

// router
//     .route('/update-ordering')
//     .post(categoryController.updateOrdering)

// router
//     .route('/')
//     .delete(categoryController.deleteCategory)

// router
//     .route('/delete/:id')
//     .get(categoryController.deleteCategoryById)

module.exports = router;