const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // //* RoutePath-
    this.authRoutePath = '/api/auth';
    this.eventsRoutePath = '/api/events';

    // //* conectar a base de datos-
    this.conectarDB();

    // //* Middelwares-
    this.middelwares();

    // //* Rutas-
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  //* Middelwares-
  middelwares() {
    //* CORS-
    this.app.use(cors());

    //* Lectura y parceo del body-
    this.app.use(express.json());

    //* Directorio Publico-    
    this.app.use(express.static(path.resolve(__dirname, '../public')));
  }

  //* Rutas-
  routes() {
    this.app.use(this.authRoutePath, require('../routes/auth'));
    this.app.use(this.eventsRoutePath, require('../routes/events'));
  }

  //* listen method
  listem() {
    this.app.listen(this.port, () => {
      console.log(` 🚀  Server ready at port ${this.port}.`);
    });
  }
}
module.exports = Server;