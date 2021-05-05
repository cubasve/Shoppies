//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import SearchBar from './components/Search';
import Nominations from './components/Nominations';
import Movies from './components/Movies';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const API = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}$s=${searchQuery}`;

  const handleChange = (e) => {
    console.log('e.target.name', e.target.name);
    console.log('e.target.value: ', e.target.value)
    setSearchQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    try {
      fetch(API);
      console.log(API);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <SearchBar 
        searchQuery={searchQuery} 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Movies />
      <Nominations />
    </div>
  );
}