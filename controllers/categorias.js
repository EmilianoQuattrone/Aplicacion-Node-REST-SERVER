const { response } = require("express");
const { Categoria } = require('../models');

const crearCategoria = async(req, res = response) => {

    try {

        const nombre = req.body.nombre.toUpperCase();

        //Verifico si la categoria existe en mi base de datos.
        const categoriasDB = await Categoria.findOne({ nombre });

        if (categoriasDB) {

            res.status(400).json({

                msg: `La categoria ${categoriasDB.nombre}, ya existe.`
            });
        }

        //Generar la data a guardar
        const data = {

            nombre,
            //Esto es el id del usuario de mongodb.
            usuario: req.usuario._id
        }

        const categoria = new Categoria(data);
        await categoria.save();

        res.status(201).json({

            nombre
        });

    } catch (error) {

        console.log(error);
        res.json({

            msg: 'No se pudo guardar en base de datos.'
        });
    }
}

const obtenerCategorias = async(req, res = response) => {

    try {

        const listarCategorias = await Categoria.find().populate('usuario', 'nombre');

        res.status(201).json({

            listarCategorias
        });

    } catch (error) {

        console.log(error);
        res.status(400).json({

            msg: 'No se encontro las categorias.'
        });
    }
}

const obtenerCategoria = async(req, res = response) => {

    try {

        const { id } = req.params;
        const unaCategoria = await Categoria.findById(id);

        res.json({

            unaCategoria
        });

    } catch (error) {

        console.log(error);
        res.status.json({

            msg: `No se encontro la ${unaCategoria}`
        });
    }
}

const actualizarCategorias = async(req, res = response) => {

    try {

        // params viene de la url ej: http://localhost:8081/api/categorias/61fa9fd2f4fd8c4e1d767185
        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;

        data.nombre = data.nombre.toUpperCase();

        //Necesito mantener el usuario dueño del token, quien fue el que modifico la categoria.
        data.usuario = req.usuario._id; //_id viene de mongo.

        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

        res.json({

            categoria
        });

    } catch (error) {

        console.log(error);

        res.status(400).json({

            msg: 'No se puedo actualizar.'
        });
    }
}

const borrarCategoria = async(req, res = response) => {

    try {

        // params viene de la url ej: http://localhost:8081/api/categorias/61fa9fd2f4fd8c4e1d767185
        const { id } = req.params;

        //Fisicamente lo borramos(Postman).
        const eliminarCategoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

        //Usuario que realizo el borrado.
        const usuarioAutenticado = req.usuario;

        res.status(200).json({

            msg: 'Peticion delete.',
            eliminarCategoria,
            usuarioAutenticado
        });

    } catch (error) {

        console.log(error);

        res.status(400).json({

            msg: 'No se puedo eliminar.'
        });
    }
}

module.exports = {

    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategorias,
    borrarCategoria
}