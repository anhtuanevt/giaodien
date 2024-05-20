const categoryModel = require('../models/category_model')

module.exports = {
    getCategoryList: async (query) => {
        return await categoryModel.find(query)
    },

    addCategory : async (data) => {
        return await categoryModel.create(data)
    },

    getCategoryById :  async (categoryId) => {
        return await categoryModel.findById(categoryId)
    },

    updateCategoryById :  async (categoryId, data) => {
        return await categoryModel.findByIdAndUpdate(categoryId, data, { new: true, runValidators: true })
    },

    deleteCategoryById :  async (categoryId) => {
        return await categoryModel.findByIdAndDelete(categoryId)
    },

    updateMultiStatus :  async (Ids, status) => {
        try {
            const result = await categoryModel.updateMany(
                { _id: { $in: Ids } }, 
                { $set: { status: status } });
            return Ids;
        } catch (error) {
            throw error;
        }
    },

    updateSingleStatus :  async (id, status) => {
        try {
            let newStatus  = status == 'active' ? 'inactive' : 'active'
            const result = await categoryModel.findByIdAndUpdate( id,
                {status: newStatus}, {new: true}
            );
            return result
        } catch (error) {
            throw error;
        }
    },

    updateOrdering: async (id, newOrdering) => {
        try {
            const result = await categoryModel.findByIdAndUpdate( id,
                {ordering: newOrdering}, {new: true}
            );
            return result
        } catch (error) {
            throw error;
        }
    },

    deleteCategory: async (Ids, status) => {
        try {
            const result = await categoryModel.deleteMany(
                { _id: { $in: Ids } })
            return result;
        } catch (error) {
            throw error;
        }
    },
}
