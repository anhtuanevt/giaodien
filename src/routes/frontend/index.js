const express = require('express')
const router = express.Router();

router.use((req, res, next) => {
    req.app.set('layout', 'frontend/index.ejs');
    next();
});


router.use('/' , require('./home'))
router.use('/category' , require('./category'))
router.use('/contact' , require('./contact'))

module.exports = router