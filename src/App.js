import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/Search/Search';
import Nominations from './components/Nominations/Nominations';
import Movies from './components/Movies/Movies';
import { Toast } from 'react-bootstrap';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  //const [isLoading, setIsLoading] = useState(false);
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
          console.log('data: ', data);
          //console.log('searchQuery in useEffect: ', searchQuery);

          if (Array.isArray(data.Search)) {
            //Only movies appear in the search results
            let onlyMovies = data.Search.filter(result => result.Type === 'movie');
            console.log('onlyMovies: ', onlyMovies);
            //Movies with unique imdbID will be shown (duplicates are filtered out)
            let noDuplicateMovies = onlyMovies.filter((id,index, onlyMovies)=>onlyMovies.findIndex(movie=>(movie.imdbID === id.imdbID))===index)
            console.log('noDuplicateMovies: ', noDuplicateMovies);
            setMovieList(noDuplicateMovies);
            console.log('finalMovieResults: ', noDuplicateMovies);
          } else {
            if (data.Error !== "Incorrect IMDb ID.") {
              setErrorMessage(data.Error);
              console.log('data.Error: ', data.Error)
            }
            console.log('movieList: ', movieList);
          }
        } catch (err) {
          console.error(err);
        }
      })();
  }, [searchQuery, movieList, movieURL]);

  const handleSearchQueryChange = async (e) => {
    e.preventDefault();
    setMovieList([]);
    //console.log('movieList: ', movieList);
    setSearchQuery(e.target.value);
    //console.log('searchQuery in handleSearch: ', searchQuery);
    //console.log('e.target.value: ', e.target.value);
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
    //console.log('nominations: ', nominations);
      // <Toast>
      //   <Toast.Header>{movie.Title}</Toast.Header>
      //   <Toast.Body>
      //     {movie.Title} was nominated!
      //   </Toast.Body>
      // </Toast>
  }

  const handleDeleteNomination = (e) => {
    //console.log('e.target.value', e.target.value)
    const nominationsCopy = [...nominations];
    let index = nominationsCopy.findIndex(movie => movie.imdbID === e.target.value)

    /* If nominated movie is not found,  */
    if (index === -1) {
      return (
        <Toast>
          <Toast.Header>Error Occurred</Toast.Header>
          <Toast.Body>
            Sorry, an error has occurred. Please try again later.
          </Toast.Body>
        </Toast>
      )
    }
    nominationsCopy.splice(index , 1);
    setNominations(nominationsCopy);
    //console.log('nominations: ', nominations)
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
          searchQuery={searchQuery}
        />
        <Nominations 
          handleDeleteNomination={handleDeleteNomination}
          nominations={nominations}
        />
      </div>
    </div>
  );
}