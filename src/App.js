import { useState } from 'react';
import './App.css';
import SearchBar from './components/Search';
import Nominations from './components/Nominations';
import Movies from './components/Movies/Movies';
import { Container, Col, Row, Toast } from 'react-bootstrap';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [nominations, setNominations] = useState([]);

  const SECRET = process.env.REACT_APP_OMDB_API_KEY;
  const movieURL = `https://www.omdbapi.com/?apikey=${SECRET}&s=${searchQuery}`;

  const handleSearchQueryChange = async (e) => {
    //console.log('e.target.name', e.target.name);
    //console.log('e.target.value: ', e.target.value)
    e.preventDefault();
    setSearchQuery(e.target.value);
    try {
      setIsLoading(true);
      const response = await fetch(movieURL);
      const data = await response.json();
      //console.log('data: ', data);
      setMovieList(data.Search);
    } catch (err) {
      console.error(err);
    }
  }

  // const handleSearchQuerySubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(movieURL);
  //     const data = await response.json();
  //     //console.log('data: ', data);
  //     setMovieList(data.Search);
  //     //console.log('movieList: ', movieList);
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  const handleAddNomination = (movie) => {
    setNominations(nominations => [...nominations, movie]);
    // <Toast>
    //   <Toast.Header>{movie.Title}</Toast.Header>
    //   <Toast.Body>
    //     {movie.Title} was nominated!
    //   </Toast.Body>
    // </Toast>
    console.log('nominations: ', nominations);
  }

  const handleDeleteNomination = (e) => {
    console.log('e.target.value', e.target.value)
    const nominationsCopy = [...nominations];

    let index = nominationsCopy.findIndex(movie => movie.imdbID === e.target.value)
    //let index = nominationsCopy.indexOf(e.target.value);
    //console.log('index: ', index);

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
    console.log('nominations: ', nominations)
  }

  return (
    <div className="App">
      <h1>The Shoppies</h1>
      <SearchBar 
        handleSearchQueryChange={handleSearchQueryChange}
        //handleSearchQuerySubmit={handleSearchQuerySubmit}
        searchQuery={searchQuery} 
      />
      <div>
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
    </div>
  );
}