const { response } = require('express');
const { hashPassword, generateJWT, verifyPasswd } = require('../helpers');
const Usuario = require('../models/Usuario');

//* crearUsuario
const crearUsuario = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    const usuario = new Usuario({
      name,
      email,
    });

    // hash password
    usuario.password = hashPassword(password);

    // Grabar eb BD
    await usuario.save();

    // Generate JWT
    const token = await generateJWT(usuario._id);

    //  response - OK 
    return res.status(201).json({
      success: true,
      msg: ' Usuario registrado de forma exitosa. ',
      access_token: token,
      usuario
    });

  } catch (error) {
    console.log({
      error: ` Se ha producido un error inesperado.  Server error.
       \'CrearUsuario\' ${error}`
    });

    return res.status(500).json({
      success: false,
      error: ` Se ha producido un error inesperado.  Server error: 500`
    });
  }
};

//* loginUsuario
const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {

    // Verify user in db
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        success: false,
        msg: 'Error: Usuario / Contraceña, no son correctos. '
      });
    }

    // Verify Password
    const respComparePasswd = verifyPasswd(password, usuario.password);
    if (!respComparePasswd) {
      return res.status(400).json({
        success: false,
        msg: 'Error: Usuario / Contraceña, no son correctos. '
      });
    }

    // Generate JWT
    const token = await generateJWT(usuario._id);

    //  response - OK 
    return res.status(200).json({
      success: true,
      msg: 'Login successful',
      access_token: token,
      usuario
    })

  } catch (error) {
    console.log({
      error: ` Se ha producido un error inesperado.  Server error.
       \'loginUsuario\' ${error}`
    });

    return res.status(500).json({
      success: false,
      error: ` Se ha producido un error inesperado.  Server error: 500`
    });
  }
};

//* renovarToken
const renovarToken = async (req, res = response) => {
  const usuario = req.usuario;

  // Generate JWT
  const token = await generateJWT(usuario._id);
  return res.json({
    success: true,
    access_token: token,
    usuario
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  renovarToken
}