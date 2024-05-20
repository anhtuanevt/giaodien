
const ItemService = require('../services/item_server');
module.exports = {
    saveItem  : async (req  , res , next ) => {
        const {name} = req.body
           try {
            const result = await ItemService.saveItem(name);
            res.send({
                result
            })
           } catch (error) {
               res.send(error)
           }
    }
}