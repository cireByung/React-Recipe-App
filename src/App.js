import React, {useState, useEffect} from 'react';
import Recipe from './Recipe';
import './App.css';

  const App = () => {
    const appID = '78f88458';
    const appKey = 'c22c565893afe2087582ec024a6d5aa7';

    const [recipes,setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("chicken");

    useEffect( () => {
      getRecipes();
    }, [query])

    const getRecipes = async () => {
      const response = await fetch('https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}&from=0&to=20&calories=591-722&health=alcohol-free')
      const data = await response.json();
      setRecipes(data.hits);
    } 

    const updateSearch = (e) => {
      setSearch(e.target.value)
    }

    const getSearch = (e) => {
      e.preventDefault();
      setSearch(e.target.value);
      setSearch('');
    }

    return (
      <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" 
          type="text" v
          value={search} 
          onChange={updateSearch}>
          </input>
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image} 
          ingredients={recipe.recipe.ingredients}
          />
        ))}
        </div>
      </div>
    )
  }
  export default App;