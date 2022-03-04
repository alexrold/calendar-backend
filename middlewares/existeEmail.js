const { response, request } = require('express');
const Usuario = require('../models/Usuario');

const existeEmail = async (req = request, res = response, next) => {

  const { email } = req.body;

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(401).json({
        success: false,
        error: ` El Correo ${email}, ya esta registrado. `
      });
    }

    next();

  } catch (error) {
    console.log({
      error: ` Se ha producido un error inesperado.  Server error.
       \'existeEmail\' ${error}`
    });

    return res.status(500).json({
      success: false,
      error: ` Se ha producido un error inesperado.  Server error: 500`
    });
  }

}
module.exports = {
  existeEmail
}
