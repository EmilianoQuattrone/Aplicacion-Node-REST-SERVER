const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuario');
const { esRolValido, emailExiste, existeUsuarioID } = require('../helpers/db-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJwt } = require('../middleware/validar-jwt');
const { tieneRol } = require('../middleware/validar-rol');
const router = Router();

router.get('/', usuarioGet);

router.put('/:id', [
    check('id', 'No es una ID valido').isMongoId(),
    check('id').custom(existeUsuarioID),
    validarCampos
], usuarioPut);

router.post('/', [
    //El check es un middleware que puedo especificar que campo del body necesito revisar.
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('correo').custom(emailExiste),
    check('password', 'El contraseña tiene que se mayor a 5 caracteres').isLength({ min: 5 }),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuarioPost);

router.delete('/:id', [
    validarJwt,
    tieneRol('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es una ID valido').isMongoId(),
    check('id').custom(existeUsuarioID),
    validarCampos
], usuarioDelete);

module.exports = router;