const bcryptjs = require('bcryptjs');

const verifyPasswd = (password, hashPasswordDb) => {

  const resp = bcryptjs.compareSync(password, hashPasswordDb);

  return resp;
}
module.exports = {
  verifyPasswd
}