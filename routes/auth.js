const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth');
const { existeEmail, validarCampos, validarJWT } = require('../middlewares');

/*
* Rutas de Usuarios / Auth
* host + /api/auth 
*/
const router = Router();

//* Nuevo Usuario 
router.post(
  '/register',
  [ //* Middlewares
    check('name', 'El nombre es Obligatorio.').not().isEmpty(),
    check('email', 'El email es Obligatorio.').not().isEmpty(),
    check('email', 'El email proporcionado, no corresponde a un email valido.').isEmail(),
    check('password', 'El password es Obligatorio.').not().isEmpty(),
    check('password', 'El password debe tener un minimo de 6 caracteres.').isLength({ min: 6 }),
    check('password', 'El password debe tener un maximo de 20 caracteres.').isLength({ max: 20 }),
    existeEmail,
    validarCampos
  ],
  crearUsuario);

//* Usuario Login 
router.post(
  '/',
  [ //* Middlewares
    check('email', 'El email es Obligatorio.').not().isEmpty(),
    check('email', 'El email proporcionado, no corresponde a un email valido.').isEmail(),
    check('password', 'El password es Obligatorio.').not().isEmpty(),
    validarCampos
  ],
  loginUsuario);

// Usuario Renew Token
router.get('/renew', validarJWT, renovarToken);

module.exports = router;