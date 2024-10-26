const { Schema, model } = require("mongoose");

const PokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  imgurl: {
    type: String,
    required: true,
  },
});

const UsuarioSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = {
  Pokemon: model("Pokemon", PokemonSchema),
  Usuario: model("Usuario", UsuarioSchema),
};
