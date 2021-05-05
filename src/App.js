import { useState } from 'react';
import './App.css';
import SearchBar from './components/Search';
import Nominations from './components/Nominations';
import Movies from './components/Movies';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const SECRET = process.env.REACT_APP_OMDB_API_KEY;
  const movieURL = `https://www.omdbapi.com/?apikey=${SECRET}&s=${searchQuery}`;

  const handleChange = (e) => {
    //console.log('e.target.name', e.target.name);
    console.log('e.target.value: ', e.target.value)
    setSearchQuery(e.target.value);
    console.log('searchQuery: ', searchQuery);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(movieURL);
      const data = await response.json();
      //console.log('data: ', data);
      setMovieList(data.Search);
      //console.log('movieList: ', movieList);
      setIsLoading(false);
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
      <Movies movieList={movieList} />
      <Nominations />
    </div>
  );
}