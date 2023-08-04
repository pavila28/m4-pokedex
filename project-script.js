var requestOptions = {
    method: 'GET',
    redirect: 'follow'
}

const nameInput = document.getElementById('nameInput')
const container = document.getElementById('container')

class myPokemon {
    constructor(name, type) {
        this.name = name
        this.type = type
    }
}

const search = async () => {
    let pokemon = await searchPokemon(nameInput.value)
    console.log(pokemon)

    container.innerHTML = `
    <div class="detailedCard">
    <h3>Pokemon: ${pokemon.name}<h3/>
    <h3>Type: ${pokemon.types[0].type.name}<h3/>
    <h3>Weight: ${pokemon.weight}<h3/>
    <img src=${pokemon.sprites.front_default}>
    <p>Abilities: ${pokemon.abilities[0].ability.name}<p/>
    <div/>`
}

const searchPokemon = async (name) => {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .catch(error => console.log('error', error))
}

const fetchPokemons = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        createPokemon(data)
    })
}

const displayPokemons = (count) => {
    container.innerHTML = ''
    nameInput.value = ''

    for (let i = 1; i <= count; i++) {
        fetchPokemons(i)
    }
}

const createPokemon = (pokemon) => {
    let newPokemon = document.createElement('div')
    newPokemon.innerHTML = `
    <div class="smallCard">
    <h3>Pokemon: ${pokemon.name}<h3/>
    <h3>Type: ${pokemon.types[0].type.name}<h3/>
    <img src=${pokemon.sprites.front_default}>
    <div/>`

    container.appendChild(newPokemon)

    // const myNewPokemon = new myPokemon (pokemon.name, pokemon.type[0].type.name)
}

window.addEventListener('load', displayPokemons(151))