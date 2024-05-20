const { Schema , model } = require("mongoose")
const slugify = require('slugify');

const CategoryModel = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    name: {
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
    article_id: [{
        type: Schema.Types.ObjectId,
        ref: 'articles'
    }],
    slug: {
        type: String,
        unique: true
    }
},{ timestamps: true })

CategoryModel.pre('save', function(next){
    if (!this.isModified('name')) {
        return next();
    }
    this.slug = slugify(this.name, { lower: true });
    next();
})

CategoryModel.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.name) {
        this.setUpdate({
            ...update,
            slug: slugify(update.name, { lower: true })
        });
    }
    next();
});

module.exports = model('categories' , CategoryModel)