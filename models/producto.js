const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

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
    },

    precio: {

        type: Number,
        default: 0
    },

    categoria: {

        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },

    descripcion: {

        type: String
    },

    dispinible: {

        type: Boolean,
        default: true
    },

    img: {

        type: String
    }
});

module.exports = model('Producto', ProductoSchema);