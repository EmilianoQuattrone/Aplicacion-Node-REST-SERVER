const { response } = require('express');
const bcryptjs = require('bcryptjs');

//Usuario esta en mayuscula por que me va a pemitir crear instancias de mi modelo.
const Usuario = require('../models/usuarios');

const usuarioGet = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    // const obtenerUsuarios = await Usuario.find({ estado: true }).limit(Number(limite)).skip(Number(desde));
    // const totalUsuarios = await Usuario.countDocuments({ estado: true });

    const [Total, Usuarios] = await Promise.all([

        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true }).limit(Number(limite)).skip(Number(desde))
    ]);

    res.json({

        mensaje: 'Peticion get - controlador',
        Total,
        Usuarios
    });
}

const usuarioPut = async(req, res = response) => {

    // params viene de la url ej: http://localhost:8081/api/usuarios/61f1a952820e645918b9725c
    const id = req.params.id;
    const { password, google, correo, ...restoPropiedades } = req.body;

    //Validar contra base de datos.
    // Si la password fue modificada hay que cambiarla.
    if (password) {

        // Encriptar la contraseña.
        const salt = bcryptjs.genSaltSync();
        restoPropiedades.password = bcryptjs.hashSync(password, salt);
    }

    // Que informacion voy actualizar restoPropiedades.
    const usuario = await Usuario.findByIdAndUpdate(id, restoPropiedades);

    res.json({

        mensaje: 'Peticion put - controlador',
        usuario
    });
}

const usuarioPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //2) Encriptar la contraseña.
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //3) Guardamos en base de datos
    await usuario.save();

    res.json({

        mensaje: 'Peticion post - controlador',
        usuario
    });
}

const usuarioDelete = async(req, res = response) => {

    // params viene de la url ej: http://localhost:8081/api/usuarios/61f1a952820e645918b9725c
    const { id } = req.params;

    //Fisicamente lo borramos.
    const usuarioEliminar = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;

    res.json({

        mensaje: 'Peticion delete - controlador',
        usuarioEliminar,
        usuarioAutenticado
    });
}

module.exports = {

    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}