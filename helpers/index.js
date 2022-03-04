const dbValidators = require('../helpers/db-validator');
const generarJWT = require('../helpers/generar-jwt');
const googleVerify = require('../helpers/google-verify');
const subirArchivos = require('../helpers/subir-archivos');

module.exports = {

    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivos
}