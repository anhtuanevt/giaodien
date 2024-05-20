const item_model = require("../models/item_model")

module.exports = {
    saveItem : async (data) => {
        try {
            const result = await item_model.create({data})
            return result;
        } catch (e) {
           throw e.errors
        }
      
    }
}