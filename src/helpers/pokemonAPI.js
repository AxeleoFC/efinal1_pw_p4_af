
async function generarLista(){
    let lista=[]
    for (let index = 0; index < 5; index++) {
        const api=await consumirAPI(getNumero(1, 400))
        let obj={
            nombre:api.name,
            id:api.id,
        }
        lista.push(obj)
    }
    return lista
}

const pokemonListafachada=async ()=>{
    return await generarLista()
}

function getNumero(min,max){
    max++;
    return Math.floor(Math.random()*(max-min)+min)
}

async function consumirAPI(id){
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(result=>result.json())
}

export default pokemonListafachada