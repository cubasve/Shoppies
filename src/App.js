import { useState } from 'react';
import './App.css';
import SearchBar from './components/Search';
import Nominations from './components/Nominations';
import Movies from './components/Movies/Movies';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [nominations, setNominations] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const SECRET = process.env.REACT_APP_OMDB_API_KEY;
  const movieURL = `https://www.omdbapi.com/?apikey=${SECRET}&s=${searchQuery}`;

  const handleSearchQueryChange = (e) => {
    //console.log('e.target.name', e.target.name);
    //console.log('e.target.value: ', e.target.value)
    setSearchQuery(e.target.value);
    //console.log('searchQuery: ', searchQuery);
  }

  const handleSearchQuerySubmit = async (e) => {
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

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  const handleAddNomination = (movie) => {
    console.log('Add Nomination here')
    // If there are more than 5 nominations (maximum number)
    if (nominations.length === 5) {
      alert('You can only have 5 nominations')
    }
    setNominations(nominations => [...nominations, movie]);
    console.log('nominations: ', nominations);
  }

  const handleDeleteNomination = () => {

  }

  return (
    <div className="App">
      <SearchBar 
        handleSearchQueryChange={handleSearchQueryChange}
        handleSearchQuerySubmit={handleSearchQuerySubmit}
        searchQuery={searchQuery} 
      />
      <Movies 
        handleAddNomination={handleAddNomination}
        movieList={movieList} 
        nominations={nominations}
      />
      <Nominations 
        handleDeleteNomination={handleDeleteNomination}
        nominations={nominations}
      />
    </div>
  );
}