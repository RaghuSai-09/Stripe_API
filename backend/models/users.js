const mongoose = require('mongoose');

let User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    plandetails : {
        name: {
            type: String,
        },
        price: {
            type: Number,
            
        },
        isMonthlySelected: {
            type: Boolean,
        },
        payment_id: {
            type: String,
        }
    },


});

module.exports = mongoose.model('User', User);