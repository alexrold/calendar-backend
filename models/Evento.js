const { Schema, model } = require('mongoose');

const EventoSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});

EventoSchema.methods.toJSON = function () {
  const { _id, __v, created_by, ...object } = this.toObject();
  object.id = _id;
  object.user = created_by;
  return object;
};


module.exports = model('Evento', EventoSchema);