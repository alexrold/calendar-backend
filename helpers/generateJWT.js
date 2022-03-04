const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

  return new Promise((resolve, reject) => {
    const payload = { uid }
    const secretKey = process.env.SECRET_OR_PRIVATE_KEY;
    const expiresIn = process.env.EXPIRESTOKEN;

    jwt.sign(payload, secretKey, {
      expiresIn,
    }, (err, token) => {
      if (err) {
        console.log({
          error: ` Se ha producido un error inesperado.  Server error.
           \'generar JWT\' ${err}`
        });
        reject(' No fue posible generar el token.')
      } else {
        resolve(token);
      }
    })
  });
};
module.exports = {
  generateJWT
}