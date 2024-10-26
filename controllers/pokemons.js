const { response } = require("express");
const { Pokemon, Usuario } = require("../models/pokemons");
const { generarJWT } = require("../helpers/generar-jwt");

const usuarioPost = async (req, res = response) => {
  const { name, email, password } = req.body;
  try {
    const usuario = new Usuario({ name, email, password });
    await usuario.save();
    console.log(`Usuario creado: ${usuario}`);
    res.json({
      msg: "Usuario creado",
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al crear usuario",
      error,
    });
  }
};

const usuarioLogin = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email, password });
    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario y/o contraseña incorrectos",
      });
    } else {
      console.log(`Login correcto.`);
      console.log(`Usuario: ${usuario.name}\nEmail: ${usuario.email}`);

      const token = await generarJWT(usuario._id);

      console.log("No trono aqui");

      res.header("x-token", token);
      console.log(`Token enviado en el header: ${token}`);

      res.json({
        msg: "Usuario logueado",
        usuario,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error al loguear usuario",
      error,
    });
  }
};

const pokemonsGet = async (req, res = response) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al obtener los pokemons",
    });
  }
};

const pokemonsPost = async (req, res = response) => {
  const { name, type, imgurl } = req.body;
  try {
    const nuevoPokemon = new Pokemon({ name, type, imgurl });
    await nuevoPokemon.save();

    res.json({
      msg: `El pokemon ${name} ha sido creado`,
      pokemon: nuevoPokemon,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al crear el pokemon",
      error,
    });
  }
};

/** Solo cambia el url de la imagen del pokemon */
const pokemonsPatch = async (req, res = response) => {
  const { _id } = req.params;
  const { imgurl } = req.body;
  try {
    const updatedPokemon = await Pokemon.findOneAndUpdate(
      { _id },
      { imgurl },
      { new: true }
    );

    if (!updatedPokemon) {
      return res.status(404).json({
        msg: "Pokemon no encontrado",
      });
    }

    res.json({
      msg: `Se ha actualizado la imagen del pokemon ${updatedPokemon.name}`,
      pokemon: updatedPokemon,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al actualizar el pokemon",
      error,
    });
  }
};

const pokemonsPut = async (req, res = response) => {
  const { _id } = req.params;
  const { name, type, imgurl } = req.body;
  try {
    const updatedPokemon = await Pokemon.findOneAndUpdate(
      { _id },
      { name, type, imgurl },
      { new: true }
    );

    if (!updatedPokemon) {
      return res.status(404).json({
        msg: "Pokemon no encontrado",
      });
    }

    res.json({
      msg: `El pokemon ${name} con id ${_id} ha sido actualizado`,
      pokemon: updatedPokemon,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al actualizar el pokemon",
      error,
    });
  }
};

const pokemonsDelete = async (req, res = response) => {
  const { _id } = req.params;
  try {
    const deletedPokemon = await Pokemon.findOneAndDelete({
      _id,
    });
    if (!deletedPokemon) {
      return res.status(404).json({
        msg: "Pokemon no encontrado",
      });
    }
    res.json({
      msg: `El pokemon ${deletedPokemon.name} ha sido eliminado`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al eliminar el pokemon",
      error,
    });
  }
};

module.exports = {
  pokemonsDelete,
  pokemonsGet,
  pokemonsPatch,
  pokemonsPut,
  pokemonsPost,
  usuarioPost,
  usuarioLogin,
};
