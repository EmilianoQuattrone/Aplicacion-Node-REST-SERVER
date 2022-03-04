const jwt = require('jsonwebtoken');
const { response } = require('express');
const Usuario = require('../models/usuarios');

const validarJwt = async(req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {

        return res.status(401).json({

            mensaje: 'No hay token en la peticion.'
        });
    }

    try {

        //Desestructuramos el uid que viene de jwt(usuario.id) de /controllers/auth.
        const { uid } = jwt.verify(token, process.env.PALABRA_SECRETA);
        // console.log(payload);

        //Leer el usuario que corresponde al uid.
        const usuario = await Usuario.findById(uid);
        if (!usuario) {

            return res.status(401).json({

                mensaje: 'Token no valido - usuario no existe en DB.'
            });
        }

        //Verificar si el uid tiene estado = true.
        if (!usuario.estado) {

            return res.status(401).json({

                mensaje: 'Token no valido - usuario con estado = false.'
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({

            mensaje: 'Token no valido.'
        });
    }
    // console.log(token);
}

module.exports = {

    validarJwt
}