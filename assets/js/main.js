const pokemonList = document.getElementById("pokemon-list");

const loadMoreButton = document.getElementById("loadMore");

const maxRecords = 151;
const limit = 12;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="card pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="detail-back">
            <stat-container" class="stat-container">
            <div class="stat-name"><p>HP</p></div>
            <div class="progress">
              <div class="progress-bar" role="progressbar" aria-valuenow="${
                pokemon.hp
              }" aria-valuemin="0" aria-valuemax="200" style="width:${
    pokemon.hpPercent
  }">${pokemon.hp}</div></div>
              <div class="stat-name"><p>ATK</p></div>
              <div class="progress">
              <div class="progress-bar" role="progressbar" aria-valuenow="${
                pokemon.atk
              }" aria-valuemin="0" aria-valuemax="200" style="width:${
    pokemon.atkPercent
  }">${pokemon.atk}</div></div>
              <div class="stat-name"><p>DEF</p></div>
              <div class="progress">
              <div class="progress-bar" role="progressbar" aria-valuenow="${
                pokemon.def
              }" aria-valuemin="0" aria-valuemax="200" style="width:${
    pokemon.defPercent
  }">${pokemon.def}</div></div>
              <div class="stat-name"><p>S-ATK</p></div>
              <div class="progress">
              <div class="progress-bar" role="progressbar" aria-valuenow="${
                pokemon.specialAtk
              }" aria-valuemin="0" aria-valuemax="200" style="width:${
    pokemon.specialAtkPercent
  }">${pokemon.specialAtk}</div></div>
              <div class="stat-name"><p>S-DEF</p></div>
              <div class="progress">
              <div class="progress-bar" role="progressbar" aria-valuenow="${
                pokemon.specialDef
              }" aria-valuemin="0" aria-valuemax="200" style="width:${
    pokemon.specialDefPercent
  }">${pokemon.specialDef}</div></div>
  </stat-container>
</div>
             `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qttRecord = offset + limit;
  if (qttRecord >= maxRecords) {
    const newLimit = qttRecord - maxRecords;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  }
  loadPokemonItens(offset, limit);
});
