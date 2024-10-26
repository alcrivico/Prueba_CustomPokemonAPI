const { Router } = require("express");
const { validarJWT } = require("../helpers/validar-jwt");

const {
  pokemonsDelete,
  pokemonsGet,
  pokemonsPatch,
  pokemonsPut,
  pokemonsPost,
  usuarioPost,
  usuarioLogin,
} = require("../controllers/pokemons");

const router = Router();

router.post("/signup", usuarioPost);
router.post("/login", usuarioLogin);
router.get("/", [validarJWT], pokemonsGet);
router.post("/", [validarJWT], pokemonsPost);
router.put("/:_id", [validarJWT], pokemonsPut);
router.patch("/:_id", [validarJWT], pokemonsPatch);
router.delete("/:_id", [validarJWT], pokemonsDelete);

module.exports = router;
