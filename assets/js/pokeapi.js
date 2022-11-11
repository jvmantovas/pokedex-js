const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  const abilities = pokeDetail.abilities.map(
    (abilitySlot) => abilitySlot.ability.name
  );
  const [ability] = abilities;
  pokemon.abilities = abilities;
  pokemon.ability = ability;
  pokemon.hp = pokeDetail.stats[0].base_stat;
  pokemon.hpPercent = pokeDetail.stats[0].base_stat / 2 + "%";
  pokemon.atk = pokeDetail.stats[1].base_stat;
  pokemon.atkPercent = pokeDetail.stats[1].base_stat / 2 + "%";
  pokemon.def = pokeDetail.stats[2].base_stat;
  pokemon.defPercent = pokeDetail.stats[2].base_stat / 2 + "%";
  pokemon.specialAtk = pokeDetail.stats[3].base_stat;
  pokemon.specialAtkPercent = pokeDetail.stats[3].base_stat / 2 + "%";
  pokemon.specialDef = pokeDetail.stats[4].base_stat;
  pokemon.specialDefPercent = pokeDetail.stats[4].base_stat / 2 + "%";
  pokemon.speed = pokeDetail.stats[5].base_stat;
  pokemon.speedPercent = pokeDetail.stats[5].base_stat / 2 + "%";
  return pokemon;
}

pokeApi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((getPokemonsDetails) => getPokemonsDetails);
};
