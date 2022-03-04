const { response } = require('express');
const Evento = require('../models/Evento');

// Obtener Eventos
const obtenerEventos = async (req, res = response) => {

  try {
    // Obtener eventos
    const eventos = await Evento.find()
      .populate('created_by', 'name');

    const amount = eventos.length;

    // Si no hay eventos
    if (!amount) {
      return res.status(200).json({
        success: true,
        msg: ' No hay eventos para mostrar. ',
      })
    }

    return res.status(200).json({
      success: true,
      msg: ' Eventos obtenidos exitosamente. ',
      amount,
      eventos
    })

  } catch (error) {
    console.log({
      error: ` Se ha producido un error inesperado.  Server error.
       \'obtenerEventos\' ${error}`
    });

    return res.status(500).json({
      success: false,
      error: ` Se ha producido un error inesperado.  Server error: 500`
    });
  }
}

// Nuevo Evento
const nuevoEvento = async (req, res = response) => {

  const evento = new Evento(req.body);
  const uid = req.usuario._id;
  evento.created_by = uid;

  try {
    const eventoDb = await evento.save();

    return res.status(200).json({
      success: true,
      msg: ` Evento ${eventoDb.title} creado exitosamente. `,
      eventoDb
    })

  } catch (error) {
    console.log({
      error: ` Se ha producido un error inesperado.  Server error.
       \'nuevoEvento\' ${error}`
    });

    return res.status(500).json({
      success: false,
      error: ` Se ha producido un error inesperado.  Server error: 500`
    });
  }
}

// Actualizar Evento
const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const usuario = req.usuario;
  const { _id: uid } = usuario;

  try {

    // Obtener y eveluar evento 
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        success: false,
        error: ` La información solicitada, no existe. `
      });
    }

    // Verificar que quien actualiza es quien lo creo     
    if (uid.toString() !== evento.created_by.toString()) {
      return res.status(401).json({
        success: false,
        error: `Operación denegada. No tienes los privilegios para editar este evento. `
      });
    }

    // actualización 
    const update = {
      ...req.body,
      created_by: uid
    }

    // save update
    const eventoUpdate = await Evento.findByIdAndUpdate(eventoId, update, { new: true });

    return res.status(200).json({
      success: true,
      msg: ` Evento ${eventoUpdate.title} actualizado exitosamente. `,
      evento: eventoUpdate
    })

  } catch (error) {
    console.log({
      error: ` Se ha producido un error inesperado.  Server error.
       \'actualizarEvento\' ${error}`
    });

    return res.status(500).json({
      success: false,
      error: ` Se ha producido un error inesperado.  Server error: 500`
    });
  }
}

// Eliminar Evento
const eliminarEvento = async (req, res = response) => {

  const eventoId = req.params.id;
  const usuario = req.usuario;
  const { _id: uid } = usuario;

  try {

    // Obtener y eveluar evento 
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        success: false,
        error: ` La información solicitada, no existe. `
      });
    }

    // Verificar que quien elimina es quien lo creo     
    if (uid.toString() !== evento.created_by.toString()) {
      return res.status(401).json({
        success: false,
        error: `Operación denegada. No tienes los privilegios para eliminar este evento. `
      });
    }

    // delet evento 
    await Evento.findByIdAndDelete(eventoId);

    return res.status(200).json({
      success: true,
      msg: ` Evento ${evento.title} eliminado exitosamente. `
    })

  } catch (error) {
    console.log({
      error: ` Se ha producido un error inesperado.  Server error.
       \'eliminarEvento\' ${error}`
    });

    return res.status(500).json({
      success: false,
      error: ` Se ha producido un error inesperado.  Server error: 500`
    });
  }
}


module.exports = {
  obtenerEventos,
  nuevoEvento,
  actualizarEvento,
  eliminarEvento
}