const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const usuarioSchema = Schema({

    nombre: {

        type: String,
        required: [true, 'Nombre es requerido'],
        unique: true
    },

    correo: {

        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {

        type: String,
        required: [true, 'Contraseña obligatoria'],
    },

    img: {

        type: String,
    },

    rol: {

        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },

    estado: {

        type: Boolean,
        default: true
    },

    google: {

        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {

    //Me va a generar una instancia con los valores respectivos, como si fuera un objeto literal de JS.
    //Me devuelve todos los datos excepto  __v, password los elimina, ver en (Postman).
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

//Monggose por defecto va a poner a la coleccion l s, quedaria Usuarios.
module.exports = model('Usuario', usuarioSchema);