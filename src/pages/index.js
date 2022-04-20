import * as React from "react"
import Layout from '../components/layout'
import Axios from "axios"

import { useDispatch } from 'react-redux'
import { pieDataUpdateAction } from '../redux/pieData/pieActions'
import { usePieData } from '../redux/pieData/usePieData'
import Pie from '../components/pie'

import * as d3 from 'd3';


// the card baby!
const IndexPage = () => {
  
  //set use states
  const [pokemonChosen, setPokemonChosen] = React.useState(false);
  const [pokemonName, setPokemonName] = React.useState("pikachu");
  const [pokemon, setPokemon] = React.useState({
    name: "", 
    //slightly -- very -- faulty
    id: 0,
    species: "", 
    image: "",
    hp: "",
    attack: "",
    defense: "",
    type: ""
  });
  const [pokemonData, setPokemonData] = React.useState(
    [{label: "HP", value: 13},
    {label: "Defense", value: 14},
    {label: "Attack", value: 15}]
    );

  //connect to api
  const searchPokemon = () => {
    try{            
      Axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase()).then(
        (response) => {
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
          //var h = parseInt(pokemon.hp);
          setPokemonData([{label: "Hp", value: response.data.stats[0].base_stat},
          {label: "Defense", value:  response.data.stats[2].base_stat},
          {label: "Attack", value: response.data.stats[1].base_stat}]) 
          setPokemonChosen(true);
        }
      );

    }catch (e){

      console.log(e)
    }
  }

  const incrementPokemon = () => {    
    try{            
      Axios.get('https://pokeapi.co/api/v2/pokemon/' + ((pokemon.id) + 1)).then(
        (response) => {
          setPokemon({
            name: response.data.species.name, 
            id: response.data.order,
            species: response.data.species.name, 
            image: response.data.sprites.front_default,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            type: response.data.types[0].type.name,
          })          
          setPokemonName(response.data.species.name)
          setPokemonData([{label: "Hp", value: response.data.stats[0].base_stat},
          {label: "Defense", value:  response.data.stats[2].base_stat},
          {label: "Attack", value: response.data.stats[1].base_stat}]) 
          setPokemonChosen(true);
        }
      );
      
    }catch (e){

      console.log(e)
    }
  }

  const decrementPokemon = () => {  
    let x = (pokemon.id) - 1;  
    try{            
      Axios.get('https://pokeapi.co/api/v2/pokemon/' + x).then(
        (response) => {
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
          setPokemonName(response.data.species.name)
          setPokemonData([{label: "Hp", value: response.data.stats[0].base_stat},
          {label: "Defense", value:  response.data.stats[2].base_stat},
          {label: "Attack", value: response.data.stats[1].base_stat}])  
          setPokemonChosen(true);
        }
      );
      
    }catch (e){

      console.log(e)
    }
  }



  //pie
  const dispatch = useDispatch()
  const pieDataValues = usePieData()
  const pieDataUpdateActionFunction = pieDataUpdateAction

  //set pie
  

  //the display
  return (      
    <Layout pageTitle="Pokedex"> 
      
      <div>
          <button onClick = {decrementPokemon}>   {'<'}   </button>        
          <input type="text" 
          onChange={(event) => {
            setPokemonName(event.target.value);
          }} 
          placeholder="Enter Pokemon Name"/>
          <button onClick = {incrementPokemon}>   {'>'}   </button>
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
          <p>This is a graph to show off the fact I can make a graph! Dandy, huh?
            (soon it will display the pokemon stats)
          </p>          
          <Pie
            data={pokemonData}
            width={400}
            height={400}
            innerRadius={100}
            outerRadius={200}
            cornerRadius={15}
          />
        </div>
       
      </div>   
    </Layout>
  )
}

export default IndexPage


/*
export default () => {
  const dispatch = useDispatch()
  const pieDataValues = usePieData()
  const pieDataUpdateActionFunction = pieDataUpdateAction
  return (
    <>
      <button onClick={() => dispatch(pieDataUpdateActionFunction())}>
        Update Data
      </button>
      <Pie
        data={pieDataValues}
        width={400}
        height={400}
        innerRadius={100}
        outerRadius={200}
        cornerRadius={15}
      />
    </>
  )
}
*/

