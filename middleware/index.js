const validarCampos = require('../middleware/validar-campos');
const validarArchivo = require('../middleware/validar-archivos');
const validarJwt = require('../middleware/validar-jwt');
const validarRol = require('../middleware/validar-rol');

module.exports = {

    ...validarCampos,
    ...validarArchivo,
    ...validarJwt,
    ...validarRol
}