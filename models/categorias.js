const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const CategoriaSchema = Schema({

    nombre: {

        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },

    estado: {

        type: Boolean,
        default: true,
        required: true
    },

    //Relacion de tabla usuario, para saber que usuario creo la categoria.
    usuario: {

        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model('Categoria', CategoriaSchema);