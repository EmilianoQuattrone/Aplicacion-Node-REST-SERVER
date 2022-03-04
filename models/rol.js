const { Schema, model } = require('mongoose');

const rolSchema = new Schema({

    rol: {

        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

module.exports = model('Rol', rolSchema)