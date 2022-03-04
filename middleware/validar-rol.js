const { response } = require("express");

const esAdminRol = (req, res = response, next) => {

    if (!req.usuario) {

        return res.status(500).json({

            mensaje: 'se quiere verificar el rol sin validar el token.'
        });
    }

    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {

        return res.status(401).json({

            mensaje: 'El usuario no administrador.'
        });
    }
    next();
}

const tieneRol = (...roles) => {

    return (req, res = response, next) => {

        //Cada vez que agregue un rol en tieneTol('ADMIN_ROLE', 'USER_ROLE') ...roles lo agrega al clg.
        // console.log(roles);

        if (!req.usuario) {

            return res.status(500).json({

                mensaje: 'se quiere verificar el rol sin validar el token.'
            });
        }

        if (!roles.includes(req.usuario.rol)) {

            return res.status(401).json({

                mensaje: `El servicio requiere uno de estos ${roles}`
            });
        }
        next();
    }
}

module.exports = {

    esAdminRol,
    tieneRol
}