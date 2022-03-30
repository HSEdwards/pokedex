import * as React from "react"
import Layout from '../components/layout'
import axios from "axios"


// the card baby!
const IndexPage = () => {
  //set use states
  const [pokemon, setPokemon] = React.useState("pikachu");
  const [pokemonData, setPokemonData] = React.useState([]);
  const [pokemonType, setPokemonType] = React.useState("")

  //connect to api
  const getPokemon = async () => {
    const toArray = [];
    try{
      const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
      const res = await axios.get(url);
      console.log(res);

      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);

    }catch (e){
      console.log(e)
    }
  }
  React.useEffect(() => {
    getPokemon();
  }, [])

  //handle form submission
  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  }


  return ( 
    

    
    <div className = "Pokedex">
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" 
          onChange={handleChange} 
          placeholder="Enter Pokemon Name"/>
        </label>
      </form>

      {pokemonData.map((data) => {
        return(
          <div className="container">
            <img />
            <div className="table">
              <div className="tableBody"></div>
              
              <div className="tableRow">
                <div className="tableCell">Type</div>
                <div className="tableCell">{pokemonType}</div>
              </div>

              <div className="tableRow">
                <div className="tableCell">Height</div>
                <div className="tableCell">{" "}{Math.round(data.height*3.9)}"</div>
              </div>

              <div className="tableRow">
                <div className="tableCell">Weight</div>
                <div className="tableCell">{" "}{Math.round(data.weight/4.3)} lbs"</div>
              </div>

              <div className="tableRow">
                <div className="tableCell">Type</div>
                <div className="tableCell">{pokemonType}</div>
              </div>

            </div>

          </div>
        )
      })}
    </div>
   

  )
}



export default IndexPage
