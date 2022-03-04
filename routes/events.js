const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerEventos, actualizarEvento, eliminarEvento, nuevoEvento } = require('../controllers/events');
const { isDate } = require('../helpers');
const { validarJWT, validarCampos } = require('../middlewares');


/*
* Rutas de Eventos / events
* host + /api/events 
*/
const router = Router();

// Obtener Eventos
router.get('/',
  [
    validarJWT
  ],
  obtenerEventos);

// Nuevo Eventos
router.put(
  '/',
  [
    check('title', ' El titulo es obligatorio. ').not().isEmpty(),
    check('start', ' La fecha de inicio es obligatorio. ').custom(isDate),
    check('end', ' La fecha de finalización es obligatorio. ').custom(isDate),
    validarJWT,
    validarCampos
  ],
  nuevoEvento);

// Actualizar Evento
router.put(
  '/:id',
  [
    check('title', ' El titulo es obligatorio. ').not().isEmpty(),
    check('start', ' La fecha de inicio es obligatorio. ').custom(isDate),
    check('end', ' La fecha de finalización es obligatorio. ').custom(isDate),
    check('id', ' La información solicitada, no existe. ').isMongoId(),
    validarJWT,
    validarCampos
  ],
  actualizarEvento);

// Eliminar Evento
router.delete(
  '/:id',
  [
    check('id', ' La información solicitada, no existe. ').not().isEmpty(),
    check('id', ' La información solicitada, no existe. ').isMongoId(),
    validarJWT,
    validarCampos
  ],
  eliminarEvento);

module.exports = router;