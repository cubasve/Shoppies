import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/Search/Search';
import Nominations from './components/Nominations/Nominations';
import Movies from './components/Movies/Movies';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const SECRET = process.env.REACT_APP_OMDB_API_KEY;
  const movieURL = `https://www.omdbapi.com/?apikey=${SECRET}&s=${searchQuery}`;

  useEffect(() => {
    (async () => {
        try {
          const response = await fetch(movieURL);
          const data = await response.json();

          if (Array.isArray(data.Search)) {
            //Only movies appear in the search results
            let onlyMovies = data.Search.filter(result => result.Type === 'movie');

            //Movies with unique imdbID will be shown (duplicates are filtered out)
            let noDuplicateMovies = onlyMovies.filter((id,index, onlyMovies)=>onlyMovies.findIndex(movie=>(movie.imdbID === id.imdbID))===index)
            
            setMovieList(noDuplicateMovies);
          } else {
            if (data.Error !== "Incorrect IMDb ID.") {
              setErrorMessage(data.Error);
            }
          }
        } catch (err) {
          console.error(err);
        }
      })();
  }, [searchQuery, movieList, movieURL]);

  const handleSearchQueryChange = async (e) => {
    e.preventDefault();
    setMovieList([]);
    setSearchQuery(e.target.value);
  }

  const handleSearchQuerySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(movieURL);
      const data = await response.json();
      setMovieList(data.Search);
    } catch (err) {
      console.error(err);
    }
  }

  const handleAddNomination = (movie) => {
    setNominations(nominations => [...nominations, movie]);
  }

  const handleDeleteNomination = (e) => {
    const nominationsCopy = [...nominations];
    let index = nominationsCopy.findIndex(movie => movie.imdbID === e.target.value)

    nominationsCopy.splice(index , 1);
    setNominations(nominationsCopy);
  }

  return (
    <div className="App">
      <h1>The Shoppies</h1>
      <SearchBar 
        handleSearchQueryChange={handleSearchQueryChange}
        handleSearchQuerySubmit={handleSearchQuerySubmit}
        searchQuery={searchQuery} 
      />
      <div className="shoppies">
        <Movies 
          errorMessage={errorMessage}
          handleAddNomination={handleAddNomination}
          movieList={movieList} 
          nominations={nominations}
        />
        <Nominations 
          handleDeleteNomination={handleDeleteNomination}
          nominations={nominations}
        />
      </div>
    </div>
  );
}