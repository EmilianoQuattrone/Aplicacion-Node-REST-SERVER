const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validator');
const { validarArchivo, validarCampos } = require('../middleware');

const router = Router();

router.get('/:coleccion/:id', [

    check('id', 'El id debe existir en mongo').isMongoId(),

    ////coleccione viene de http://localhost:8081/api/uploads/usuario/abc123 (postman).
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

router.post('/', validarArchivo, cargarArchivos);

router.put('/:coleccion/:id', [

    validarArchivo,
    check('id', 'El id debe existir en mongo').isMongoId(),

    ////coleccione viene de http://localhost:8081/api/uploads/usuario/abc123 (postman).
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen);

module.exports = router;