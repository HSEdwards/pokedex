import * as React from "react"
import Layout from '../components/layout'
import Axios from "axios"
import Pie from '../components/pie'


// the main webpage
const IndexPage = () => {
  
  //set use states
  const [pokemonChosen, setPokemonChosen] = React.useState(false);
  const [pokemonName, setPokemonName] = React.useState("pikachu");
  const [pokemon, setPokemon] = React.useState({
    name: "", 
    //slightly -- very -- faulty id number
    id: 0,
    species: "", 
    image: "",
    hp: "",
    attack: "",
    defense: "",
    type: ""
  });

  //Format data for the Pie Chart
  const [pokePieData, setPokePieData] = React.useState([
    {label: "HP", value: 10},
    {label: "Defense", value: 20},
    {label: "Attack", value: 30}
  ]);
  

  //connect to api
  const searchPokemon = () => {
    try{            
      Axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase()).then(
        (response) => {
          //set the pokemon information
          setPokemon({
            name: pokemonName, 
            id: response.data.order,
            species: response.data.species.name, 
            image: response.data.sprites.front_default,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            type: response.data.types[0].type.name,
          }) 
          //set the pie chart information
          setPokePieData([{label: "Hp", value: response.data.stats[0].base_stat},
          {label: "Defense", value:  response.data.stats[2].base_stat},
          {label: "Attack", value: response.data.stats[1].base_stat}]) 
          
          //set use state
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
                 
          <input type="text" onChange={(event) => {
            setPokemonName(event.target.value);
          }} placeholder="Enter Pokemon Name"/>
          
          <br></br> 

          <button onClick = {searchPokemon} >Search</button>
        
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
          
          {!pokemonChosen ? (<p>Search a Pokemon!</p>) : (<p></p>)}
        </div>

        <div>
          <p>This is a graph to show off the fact I can make a graph! Dandy, huh?</p>          
          <Pie
            data={pokePieData}
            width={400}
            height={400}
            innerRadius={75}
            outerRadius={175}
            cornerRadius={15}
          />
          
        </div>
       
      </div>   
    </Layout>
  )
}

export default IndexPage

