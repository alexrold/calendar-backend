const bcryptjs = require('bcryptjs');

const hashPassword = (passwdNoHash) => {
  const salt = bcryptjs.genSaltSync();
  const passsword = bcryptjs.hashSync(passwdNoHash, salt);
  return passsword;
}
module.exports = {
  hashPassword
}