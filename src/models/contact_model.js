const { Schema , model } = require("mongoose")
const validator = require('validator');

const ContactModel = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    name: {
        type: String, 
        required: true 
    },
    email: {
        type: String, 
        required: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email address!`
        }
    },
    message: {
        type: String, 
        required: true,
    },
    status: {
        type: String, 
        enum: ['active', 'inactive'],
        default: 'active'
    },
},{ timestamps: true })


module.exports = model('contacts' , ContactModel)