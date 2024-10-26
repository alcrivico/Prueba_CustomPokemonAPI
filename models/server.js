const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/pokemons", require("../routes/pokemons"));
  }

  database() {
    const mongoDBURI = process.env.MONGODB_URI;

    mongoose
      .connect(mongoDBURI, {})
      .then(() => console.log("Conectado a MongoDB"))
      .catch((err) => console.error("Error al conectar a MongoDB:", err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor ejecutandose en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
