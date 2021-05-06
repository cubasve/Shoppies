import { useState } from 'react';
import './App.css';
import SearchBar from './components/Search';
import Nominations from './components/Nominations';
import Movies from './components/Movies/Movies';
//import { Button, Modal } from 'react-bootstrap';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [nominations, setNominations] = useState([]);

  const SECRET = process.env.REACT_APP_OMDB_API_KEY;
  const movieURL = `https://www.omdbapi.com/?apikey=${SECRET}&s=${searchQuery}`;

  // const [showModal, setShowModal] = useState(false);

  // const handleCloseModal = () => setShowModal(false);
  // const handleOpenModal = () => setShowModal(true);

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

  const handleAddNomination = (movie) => {
    console.log('Add Nomination here')
    // If 5 movies have already been nominated 
    // if (nominations.length === 5) {
    //   handleOpenModal();
    //   return(
    //     <Modal 
    //       showModal={showModal}
    //       onHide={handleCloseModal}
    //   >
    //       <Modal.Header closeButton>
    //           <Modal.Title>You can only have 5 nominations</Modal.Title>
    //           <Modal.Body>Eva</Modal.Body>
    //           <Modal.Footer>
    //               <Button variant="secondary" onClick={handleCloseModal}>OK</Button>
    //           </Modal.Footer>
    //       </Modal.Header>
    //   </Modal>
    //   )
    // }
    setNominations(nominations => [...nominations, movie]);
    console.log('nominations: ', nominations);
  }

  const handleDeleteNomination = (e) => {
    console.log('e.target.value', e.target.value)
    const nominationsCopy = [...nominations];

    let index = nominationsCopy.findIndex(movie => movie.imdbID === e.target.value)
    //let index = nominationsCopy.indexOf(e.target.value);
    console.log('index: ', index);
    //if (index === -1) //toast: Sorry, an error occurred
    nominationsCopy.splice(index , 1);
    setNominations(nominationsCopy);
    console.log('nominations: ', nominations)
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