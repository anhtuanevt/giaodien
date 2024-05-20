var express = require('express');
var router = express.Router();
const categoryService = require('../services/category_service')

router.use(async (req, res, next) => {
    const categories = await categoryService.getCategoryList({})
    res.locals.categories = categories
    next();
})

router.use('/' , require('./frontend'))
router.use('/admin' , require('./backend'))

module.exports = router;