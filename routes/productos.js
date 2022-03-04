const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProducto, obtenerProductoID, eliminarProdcuto, actualizarProdcuto } = require('../controllers/productos');
const { existeCategoriaID, existeProductoID } = require('../helpers/db-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJwt } = require('../middleware/validar-jwt');

const router = Router();

//Obtener producto.
router.get('/', obtenerProducto);

//Obtener producto por id.
router.get('/:id', [

    check('id', 'Tiene que ser un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoID),
    validarCampos
], obtenerProductoID);

//Crear un producto.
router.post('/', [

    validarJwt,
    check('nombre', 'El nombre es requerido.').not().isEmpty(),
    check('categoria', 'No es un ID de mongo.').isMongoId(),
    check('categoria').custom(existeCategoriaID),
    validarCampos
], crearProducto);

//Actualizar un producto.
router.put('/:id', [

    validarJwt,
    check('nombre', 'El nombre es requerido.').not().isEmpty(),
    check('id', 'Tiene que se un id valido de mongo').isMongoId(),
    check('id').custom(existeProductoID),
    validarCampos
], actualizarProdcuto);

//Eliminar un producto.
router.delete('/:id', [

    validarJwt,
    check('id', 'Tiene que se un id valido de mongo').isMongoId(),
    check('id').custom(existeProductoID),
    validarCampos
], eliminarProdcuto);

module.exports = router;