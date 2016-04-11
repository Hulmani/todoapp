var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: {
        type: String,
        default: ''
    },
    userName:{
        type: String,
        default: 'noName'
    },
                                
    completed:{
        type: Boolean,
        default: false
    }
                        
});