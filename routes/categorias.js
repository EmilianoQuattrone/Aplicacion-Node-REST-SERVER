const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategorias, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaID } = require('../helpers/db-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJwt } = require('../middleware/validar-jwt');


// http://localhost:8081/api/categorias
//Obtener todas las categorias.
router.get('/', obtenerCategorias);

//Obtener una categoria por id.
router.get('/:id', [

    check('id', 'No es una ID valido').isMongoId(),
    check('id').custom(existeCategoriaID),
    validarCampos
], obtenerCategoria);

//Crear categoria cualquier persona que tenga token de acceso.
router.post('/', [

    validarJwt,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar cualquiera con token valido
router.put('/:id', [

    validarJwt,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('id').custom(existeCategoriaID),
    validarCampos
], actualizarCategorias);

//Borrar una categoria solo admin.
router.delete('/:id', [

    validarJwt,
    check('id', 'No es una ID valido').isMongoId(),
    check('id').custom(existeCategoriaID),
    validarCampos
], borrarCategoria);

module.exports = router;