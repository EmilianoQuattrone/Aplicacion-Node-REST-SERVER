const { response } = require("express");
const { Producto } = require("../models");

const crearProducto = async(req, res = response) => {

    try {

        const { estado, usuario, ...body } = req.body;

        //Verifico si el producto existe en mi base de datos.
        const productoDB = await Producto.findOne({ nombre: body.nombre });

        if (productoDB) {

            res.status(400).json({

                msg: `El producto ${productoDB.nombre} ya existe.`
            });
        }

        const data = {

            ...body,
            nombre: body.nombre.toUpperCase(),

            //Esto es el id del usuario de mongodb.
            usuario: req.usuario._id,
        }

        const producto = new Producto(data);
        await producto.save();

        res.json({

            producto
        });

    } catch (error) {

        console.log(error);
        res.json({

            msg: 'El producto ya existe.'
        });
    }
}

const obtenerProducto = async(req, res) => {

    try {

        const productos = await Producto.find().populate('usuario', 'nombre');

        res.json({

            productos
        });

    } catch (error) {

        console.log(error);
        res.json({

            msg: 'No se pudieron encontrar los productos.'
        });
    }
}

const obtenerProductoID = async(req, res) => {

    try {

        const { id } = req.params;
        const productoId = await Producto.findById(id).populate('usuario', 'nombre')
            .populate('categoria', 'nombre');
        res.json({

            productoId
        });

    } catch (error) {

        console.log(error);
        res.json({

            msg: 'No se pudo encontrar el producto por ID.'
        });
    }
}

const actualizarProdcuto = async(req, res) => {

    try {

        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;

        data.nombre = data.nombre.toUpperCase();
        //Necesito mantener el usuario dueño del token, quien fue el que modifico la categoria.
        data.usuario = req.usuario._id; //_id viene de mongo.

        const actualizarProductoId = await Producto.findByIdAndUpdate(id, data, { new: true });

        res.json({

            actualizarProductoId
        });

    } catch (error) {

        console.log(error);
        res.json({

            msg: 'No se pudo actualizar el producto.'
        });
    }
}

const eliminarProdcuto = async(req, res) => {

    try {

        const { id } = req.params;
        const eliminarProductoId = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
        const usuarioAutenticado = req.usuario;

        res.json({

            eliminarProductoId,
            usuarioAutenticado
        });

    } catch (error) {

        console.log(error);
        res.json({

            msg: 'Ocurrio un error, no se pudo eliminar el producto.'
        })
    }
}

module.exports = {

    crearProducto,
    obtenerProducto,
    obtenerProductoID,
    actualizarProdcuto,
    eliminarProdcuto
}