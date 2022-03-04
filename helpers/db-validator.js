//Usuario esta en mayuscula por que me va a pemitir crear instancias de mi modelo.
const Usuario = require('../models/usuarios');
const Role = require('../models/rol');
const { Categoria, Producto } = require('../models');

const esRolValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {

        throw new Error(`El ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async(correo = '') => {

    //1) Verificar si el correo existe.
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {

        throw new Error(`El ${correo} ya existe`);
    }
}

const existeUsuarioID = async(id) => {

    //1) Verificar si el usuario existe.
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {

        throw new Error(`El ${id} ya existe`);
    }
}

const existeCategoriaID = async(id) => {

    //Verificar si la categoria existe.
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {

        throw new Error(`El ${id} ya existe.`);
    }
}

const existeProductoID = async(id) => {

    //Verificar si existe el producto.
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {

        throw new Error(`El ${id} ya existe.`);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    //colecciones viene de http://localhost:8081/api/uploads/usuario/abc123 (postman).
    const incluidas = colecciones.includes(coleccion);

    if (!incluidas) {

        throw new
        Error(`La coleccion ${coleccion} no es permitida, las colecciones permitidas son ${colecciones}.`);
    }

    //Si todo sale bien.
    return true
}

module.exports = {

    esRolValido,
    emailExiste,
    existeUsuarioID,
    existeCategoriaID,
    existeProductoID,
    coleccionesPermitidas
}