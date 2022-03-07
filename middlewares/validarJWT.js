const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarJWT = async (req = request, res = response, next) => {

  const token = req.header('x-token');
  const secretKey = process.env.SECRET_OR_PRIVATE_KEY;

  // no token
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: ` Operación denegada. `
    });
  }

  try {

    // Verify token
    const { uid } = jwt.verify(token, secretKey);

    // Verify user in db
    const usuario = await Usuario.findById(uid);

    // User Not ok
    if (!usuario) {
      return res.status(401).json({
        success: false,
        msg: `Operación denegada.  `
      });
    }

    // Include usuario in request
    req.usuario = usuario;

    // OK continue
    next();

  } catch (error) {
    console.log({
      error: ` Error: Intenta cerrar la sesión y volver a ingresar a tu cuenta, asegurándote de cerrar completamente la aplicación. 
       \'Validar token\' ${error} `
    });

    return res.status(401).json({
      success: false,
      msg: ` Error: Intenta cerrar la sesión y volver a ingresar a tu cuenta, asegurándote de cerrar completamente la aplicación. `
    });
  }
}
module.exports = {
  validarJWT
}