const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    //Manejo de error.
    try {

        //Verificar si existe el correo.
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {

            return res.status(400).json({

                mensaje: 'El usuario no existe - correo.'
            });
        }

        //Verificar si el usuario esta activo.
        if (!usuario.estado) {

            return res.status(400).json({

                mensaje: 'El usuario no existe - estado: false.'
            });
        }

        //Verificar la contraseñna.
        const verificarPassword = bcryptjs.compareSync(password, usuario.password);

        if (!verificarPassword) {

            res.status(400).json({

                mensaje: 'La contraseña no escorrecta - password.'
            });
        }

        //Generar JWT.
        const token = await generarJWT(usuario.id);

        res.json({

            msg: 'Login ok',
            usuario,
            token
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, imagen, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {

            //Tengo que crearlo.
            const data = {

                nombre,
                correo,
                password: ':p',
                // rol: 'ADMIN_ROLE',
                google: true,
                imagen
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        //Por si el estado del usuario en DB es false.
        if (!usuario.estado) {

            res.status(401).json({

                msg: 'Usuario bloqueado.'
            });
        }

        //Generar JWT.
        const token = await generarJWT(usuario.id);

        res.json({

            usuario,
            token
        });

    } catch (error) {

        console.log(error);

        res.status(400).json({

            ok: false,
            msg: 'El token no se pudo verificar.'
        });
    }

}

module.exports = {

    login,
    googleSignIn
}