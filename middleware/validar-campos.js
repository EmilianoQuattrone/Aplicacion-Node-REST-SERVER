const { validationResult } = require('express-validator');
const { response } = require('express');

const validarCampos = (req, res = response, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {

        return res.status(400).json({

            errores
        });
    }

    // Si caemos aqui, va a seguir evaluando los siguientes campos(los middlewares).
    next();
}

module.exports = {

    validarCampos
}