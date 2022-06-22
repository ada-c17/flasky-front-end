import './App.css';
import React, {useState, useEffect} from 'react';
import CatList from './components/CatList';
import axios from 'axios';

// Moved Cat and Dog data into 'data' folder
export const URL = 'http://localhost:5000/cats';

function App() {

  const [cats, setCats] = useState([]);
  const [status, setStatus] = useState('Loading...');

  useEffect(()=>{
    axios
      .get(URL)
      .then((response)=>{
        const newCats = response.data.map((cat) => {
          return {
            name: cat.name, 
            id: cat.id,
            personality: cat.personality
          };
        });
        setStatus("Loaded");
        setCats(newCats)
      })
      .catch((err)=>{
        console.log(err);
      });
  }, [])

  const onRemove = (id) => {
    //this will alter cat data based on cat's id
    const newCats = cats.filter((cat) => {
      //we only want to add the cat to the array if it's id does not equal the id of the cat we want to remove
      return cat.id !== id;
    });
    //newCats holds our new array of cats
    setCats(newCats);
  }
  
  return (
    <main>
      <h1>The Cat Corral</h1>
      <CatList catData={cats} onRemove={onRemove}></CatList>
    </main>
  );
}

export default App;
