import * as React from "react"
import Layout from '../components/layout'
import Axios from "axios"

//the formatting
// styles





// the card baby!
const IndexPage = () => {
  //set use states
  const [pokemonChosen, setPokemonChosen] = React.useState(false);
  const [pokemonName, setPokemonName] = React.useState("pikachu");
  const [pokemon, setPokemon] = React.useState({
    name: "", 
    species: "", 
    image: "",
    hp: "",
    attack: "",
    defense: "",
    type: ""
  });

  //connect to api
  const searchPokemon = () => {
    try{      
      const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName;
      Axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName).then(
        (response) => {
          setPokemon({
            name: pokemonName, 
            species: response.data.species.name, 
            image: response.data.sprites.front_default,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            type: response.data.types[0].type.name,
          })
          setPokemonChosen(true);
        }
      );
      

    }catch (e){
      console.log(e)
    }
  }

  
  //the display
  return (   
    
    <Layout pageTitle="Pokedex">      
      <div>

        {/* search box */}
        
          <label>
            <input type="text" 
            onChange={(event) => {
              setPokemonName(event.target.value);
            }} 
            placeholder="Enter Pokemon Name"/>
          </label>
          <button onClick = {searchPokemon}>Search</button>
        
        <div>
          <img src = {pokemon.image}/> 
        </div>
        <div>  
           
          <table>
            <tr>
              <th>Stat</th>
              <th>Data</th>
            </tr>
            <tr>
              <td>Species</td>
              <td>{pokemon.species}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{pokemon.type}</td>
            </tr>
            <tr>
              <td>HP</td>
              <td>{pokemon.hp}</td>
              
            </tr>
            <tr>
              <td>Attack</td>
              <td>{pokemon.attack}</td>
            </tr>
            <tr>
              <td>Defense</td>
              <td>{pokemon.defense}</td>
            </tr>
          </table>      
          {!pokemonChosen ? (<p>Search a Pokemon</p>) : (<p></p>)}
        </div>

       
      </div>   
    </Layout>
      
    
    

  )
}
export default IndexPage
