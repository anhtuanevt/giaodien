const ContactModel = require('../models/contact_model')

module.exports = {
    getContactList: async (query) => {
        return await ContactModel.find(query)
    },

    getContactById :  async (contactId) => {
        return await ContactModel.findById(contactId)
    },
   
    addContact : async (data) => {
        return await ContactModel.create(data)
    },

    updateContactById :  async (id, data) => {
        return await ContactModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    },

    // deleteCategoryById :  async (categoryId) => {
    //     return await categoryModel.findByIdAndDelete(categoryId)
    // },

    // updateMultiStatus :  async (Ids, status) => {
    //     try {
    //         const result = await categoryModel.updateMany(
    //             { _id: { $in: Ids } }, 
    //             { $set: { status: status } });
    //         return Ids;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // updateSingleStatus :  async (id, status) => {
    //     try {
    //         let newStatus  = status == 'active' ? 'inactive' : 'active'
    //         const result = await categoryModel.findByIdAndUpdate( id,
    //             {status: newStatus}, {new: true}
    //         );
    //         return result
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // updateOrdering: async (id, newOrdering) => {
    //     try {
    //         const result = await categoryModel.findByIdAndUpdate( id,
    //             {ordering: newOrdering}, {new: true}
    //         );
    //         return result
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // deleteCategory: async (Ids, status) => {
    //     try {
    //         const result = await categoryModel.deleteMany(
    //             { _id: { $in: Ids } })
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
}
