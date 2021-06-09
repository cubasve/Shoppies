import { useCallback, useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/Search/Search';
import Nominations from './components/Nominations/Nominations';
import Movies from './components/Movies/Movies';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movieList, setMovieList] = useState([ ]);
  const [nominations, setNominations] = useState([ ]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const SECRET = process.env.REACT_APP_OMDB_API_KEY;
  const movieURL = `https://www.omdbapi.com/?apikey=${SECRET}&s=${searchQuery}`;

  const fetchNominationsFromStorage = useCallback(() => {
    //JSON.parse(): converts items in local storage from a string to an object
    const nominationsFromStorage = JSON.parse(localStorage.getItem('savedNominations') || '[]');
    setNominations(nominationsFromStorage);
  }, [nominations, setNominations]);

  useEffect(() => {
    if (isLoading) {
      fetchNominationsFromStorage();
      setIsLoading(false);
    }
  }, [fetchNominationsFromStorage, isLoading]);

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
    console.log('movie: ', movie);
    console.log('nominations: ', nominations);
    setNominations(nominations => [...nominations, movie]);

    //JSON.stringify(): converts a JS object/value to a string
    localStorage.setItem('savedNominations', JSON.stringify([...nominations]));
    console.log('localStorage: ', localStorage.getItem('savedNominations'));
    console.log('nominations after adding to LocalS: ', nominations)
  }

  const handleDeleteNomination = (e) => {
    const nominationsCopy = [...nominations];
    let index = nominationsCopy.findIndex(movie => movie.imdbID === e.target.value);

    if (index !== -1) {
      nominationsCopy.splice(index , 1);
      setNominations(nominationsCopy);
      console.log('delete nominations Copy: ', nominationsCopy);

      localStorage.setItem('savedNominations', JSON.stringify([nominationsCopy]));
      console.log('localStorage: ', localStorage.getItem('savedNominations'));
      console.log('localS delete nomination: ', nominations);
      //localStorage.setItem('savedNominations', JSON.stringify([...nominationsCopy]));

      // localStorage.clear();
      // localStorage.setItem('savedNominations', JSON.stringify([nominations]));
      // console.log(localStorage)
    }
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