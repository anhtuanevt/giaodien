const { Schema , model} = require('mongoose')


const ItemModel = new Schema({
    name : {
        type : String,
        required: [true, 'Dữ liệu không được rỗng?']
    },
    age : {
        type : Number,
        required: true
    }
})

module.exports = model('Items' , ItemModel);