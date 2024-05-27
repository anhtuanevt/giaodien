
const categoryService = require('../services/category_service');
const statusCode = require('../core/status.code');
const linkChangStatus = '/admin/category/update-single-status'

module.exports = {
    getCategory : async(req, res, next) => {
        let query = (req.query.status) ? {status: req.query.status} : {}
        const categories = await categoryService.getCategoryList(query);

        const allCategories = await categoryService.getCategoryList({})
        const activeCategories = allCategories.filter(category => category.status === 'active');
        const inactiveCategories = allCategories.filter(category => category.status === 'inactive');

        res.render('backend/page/category/list', {categories, linkChangStatus,
            allCategories,
            activeCategories: activeCategories.length,
            inactiveCategories: inactiveCategories.length })
    },

    getCategoryById : async (req , res , next) => {
        try {
            const categoryId = req.params.id;
            let category = {
                name: "",
                ordering: "",
                status: "novalue",
            }
            if (categoryId) category = await categoryService.getCategoryById(categoryId);
            res.render('backend/page/category/form',{category }); 
        } catch (error) {
            return error
        }
    },

    addCategory : async (req , res , next) => {
        const data = req.body
        console.log('data', data)
        try {
            const result = await categoryService.addCategory(data);
            if(result._id) {
                req.flash('success', 'Category updated successfully!',false);
                res.redirect('/admin/category');
            } 
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    },

    updateCategoryById : async (req , res , next) => {
        console.log('updateCategoryById', req.params.id, req.query)
        const categoryId = req.params.id;
        const data = req.body
        console.log('date', data, categoryId)
        try {
            const result = await categoryService.updateCategoryById(categoryId, data);
            if(result._id) res.redirect('/admin/category')
        } catch (error) {
            res.send(error)
        }
    },

    deleteCategoryById : async (req , res , next) => {
        const categoryId = req.params.id;
        try {
         const result = await categoryService.deleteCategoryById(categoryId);
         res.redirect('/admin/category')
        } catch (error) {
            res.send(error)
        }
    },

    updateMultiStatus : async (req , res , next) => {
        const status = req.params.status;
        const Ids= req.body.ids
        try {
         const result = await categoryService.updateMultiStatus(Ids, status);
         res.send({
            success: true,
            result
         })
        } catch (error) {
            res.send(error)
        }
    },

    updateSingleStatus : async (req , res , next) => {
        const {id, status} = req.body;
        try {
         const result = await categoryService.updateSingleStatus(id, status);
         res.send({
             success: true,
             result
         })
        } catch (error) {
            res.send(error)
        }
    },

    updateOrdering : async (req , res , next) => {
        const {id, newOrdering} = req.body;
        try {
         const result = await categoryService.updateOrdering(id, newOrdering);
         res.send({
             success: true,
             result
         })
        } catch (error) {
            res.send(error)
        }
    },

    deleteCategory : async (req , res , next) => {
        const ids= req.body.ids
        try {
         const result = await categoryService.deleteCategory(ids);
         res.send({
            success: true,
             result
         })
        } catch (error) {
            res.send(error)
        }
    },
}
