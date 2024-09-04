//No HTML temos a <ol> com o ID = pokemonList, com o document podemos manipular essa lista buscando pelo ID.
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('pokemonList');
const maxRecord = 14
const limit = 6;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then(function (pokemons = []){
        // const listaPokemonsHTML = []
        // for (let i = 0; i < pokemons.length; i++) {
        //     const pokemon = pokemons[i];
        //     listaPokemonsHTML.push(convertPokemonJsonToList(pokemon))
        // }
        //O map tem a mesma funcionalidade que o for acima, assim chamando direto a convertPokemonJsonToList, ou seja, transformo o JSON com o map, converto pra HTML e o .join concatena todos.
        const newHtml = pokemons.map((pokemon) =>`
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
            
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                         alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtRecordNextPage = offset + limit

    if (qtRecordNextPage >= maxRecord) {
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})