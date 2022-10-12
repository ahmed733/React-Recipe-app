import React,{useEffect,useState} from "react"; 
import Recipe from './Recipes';
import './App.css';

const App = () => {
  const APP_ID="aad9469e";
  const APP_KEY="318c9048220a3bc2cf25666cc3e951b1";
  const[recipes,setrecipes] = useState([]);
  const[search,setsearch] = useState("");
  const[query,setquery] = useState('chicken');
  useEffect(() => {
    getRecipes();
  },[query]);
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setrecipes(data.hits);
      console.log(data.hits);
  };
  const updateSearch = e => {
    setsearch(e.target.value);
    
  };
  const getSearch = e => {
    e.preventDefault();
    setquery(search);
    setsearch('');
  };
  return (
    <div className="App">
   <form className="search-form" onSubmit={getSearch}>
    <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
    <button className="search-button" type="submit">
    Search 
    </button>
    </form>
    <div className="recipescss">
    {recipes.map(recipe =>(
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
  );
};

export default App;
