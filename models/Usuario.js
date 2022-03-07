const { Schema, model } = require('mongoose')

const UsuarioSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
UsuarioSchema.methods.toJSON = function () {
  const { password, __v, ...object } = this.toObject();
  return object;
};
module.exports = model('Usuario', UsuarioSchema);