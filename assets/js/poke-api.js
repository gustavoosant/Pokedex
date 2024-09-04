
const pokeApi = {}

function convertPokeApiDetailToPokemonModel(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemonModel)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    //Promise - é a promessa do resultado devido ao processamento assíncrono(durante o processamento aguardamos o resultado).
    return fetch(url)
        //Neste primeiro ".then" faz a conversão do promisse(que é do tipo any) para um json.
        //É possível usar arrow function, no caso como só tem 1 linha, pode ser escrito: .then((response) => response.json())
        .then(function (response) {
            return response.json()
        })
        //Neste segundo ".then" retorna o promise do primeiro.
        .then(function (jsonBody) {
            return jsonBody.results
        })
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailsRequests) => Promise.all(detailsRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
