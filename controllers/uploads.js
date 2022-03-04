const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivos");
const { Usuario, Producto } = require('../models/index');
const path = require('path');
const fs = require('fs');
const { model } = require("mongoose");

const cargarArchivos = async(req, res = response) => {

    // Esto viene de postman from-data.
    if (!req.files.archivo) {

        res.status(400).json({ msg: 'No hay archivos que subir' });
        return;
    }

    try {

        // const archivo = await subirArchivo(req.files, ['txt', 'md'], 'textos'); prueba

        //Como el path sigue siendo el uploads, lo dejo como esta por defecto.
        const archivo = await subirArchivo(req.files, undefined, 'imagenes');

        res.json({

            archivo
        });

    } catch (error) {

        res.status(400).json({

            error
        });
    }
}

const actualizarImagen = async(req, res = response) => {

    //router.put('/:coleccion/:id');
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {

        case 'usuarios':

            modelo = await Usuario.findById(id);

            if (!modelo) {

                return res.status(400).json({

                    msg: `No existe un usuario con el id: ${id}.`
                });
            }

            break;

        case 'productos':

            modelo = await Producto.findById(id);

            if (!modelo) {

                return res.status(400).json({

                    msg: `No existe un producto con el id: ${id}.`
                });
            }

            break;

        default:

            return res.status(500).json({

                msg: 'Nos validamos esto.'
            });
    }

    //Limpiar imagenes previas.
    if (modelo.img) {

        //Hay que borrar la imagen del servidor.
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

        if (fs.existsSync(pathImagen)) {

            //Borrar el archivo.
            fs.unlinkSync(pathImagen);
        }
    }

    const archivo = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = archivo;

    await modelo.save();

    res.json({

        modelo
    });
}

const mostrarImagen = async(req, res = response) => {

    //router.get('/:coleccion/:id');
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {

        case 'usuarios':

            modelo = await Usuario.findById(id);

            if (!modelo) {

                return res.status(400).json({

                    msg: `No existe un usuario con el id: ${id}.`
                });
            }

            break;

        case 'productos':

            modelo = await Producto.findById(id);

            if (!modelo) {

                return res.status(400).json({

                    msg: `No existe un producto con el id: ${id}.`
                });
            }

            break;

        default:

            return res.status(500).json({

                msg: 'Nos validamos esto.'
            });
    }

    //Limpiar imagenes previas.
    if (modelo.img) {

        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);

        if (fs.existsSync(pathImagen)) {

            //Responder la imagen.
            return res.sendFile(pathImagen);
        }
    }

    const pathImagenError = path.join(__dirname, '../assets/no-image.jpg');

    res.sendFile(

        pathImagenError
    );
}

module.exports = {

    cargarArchivos,
    actualizarImagen,
    mostrarImagen
}