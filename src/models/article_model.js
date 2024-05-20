const { Schema , model } = require("mongoose")

const ArticleModel = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    name: {
        type: String, 
        required: true 
    },
    description: {
        type: String, 
    },
    title: {
        type: String, 
    },
    thumbnail: {
        type: String, 
    },
    is_hot: {
        type: Boolean,
    },
    is_home: {
        type: Boolean,
    },
    author: {
        type: String, 
        required: true 
    },
    status: {
        type: String, 
        enum: ['active', 'inactive'],
        default: 'active'
    },
    ordering: {
        type: Number,
        required: true 
    },
  
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    tags: {
        type: String,
        required: true 
    }
},{ timestamps: true })


module.exports = model('articles' , ArticleModel)