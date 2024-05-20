const express = require('express')
const router = express.Router();

router.get('/' , async (req , res , next) => {
    const categories = res.locals.categories;
    res.render('frontend/page/home', {categories})
})

module.exports = router;