import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import './Movies.css';

export default function Movies({ 
    errorMessage, handleAddNomination, movieList, nominations, searchQuery
}) {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);

    return (
        <div className="movies">
            <h4 className="movie-banner">Movie Search Results</h4>
            <div className="movielist">
                {movieList && movieList.length ?
                    movieList.map(movie => {
                        return (
                            <div key={movie.imdbID}>
                                <Card style={{ width: "14rem"}} border="dark" className="text-center">
                                        {/* If there is no image for the movie, show the backup picture */}
                                        {movie.Poster !== "N/A" ? 
                                        <Card.Img variant="top" src={movie.Poster}/> : 
                                        <Card.Img variant="top" style={{height: "18rem"}} src="./MoviePosterBackup.jpeg" />
                                        }
                                    <Card.Body>
                                        <Card.Title>{movie.Title}</Card.Title>
                                        <Card.Text>{movie.Year}</Card.Text>

                                        {/* If the movie is already nominated, disable the button */}
                                        {nominations.find(nomination => nomination.imdbID === movie.imdbID) ? ( 
                                            <Button 
                                                variant="secondary"
                                                disabled
                                            >
                                                Nominated
                                            </Button> )
                                            :
                                        /* If there are already 5 nominations, show the modal */
                                            nominations.length === 5 ? (
                                                <>
                                                    <Button 
                                                        variant="primary"
                                                        onClick={handleOpenModal}
                                                    >
                                                        Nominate
                                                    </Button>
                                                    <Modal 
                                                        show={showModal}
                                                        onHide={handleCloseModal}
                                                        backdrop="static"
                                                    >
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Nominations</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            You can only have 5 nominations. To nominate another movie, please remove one from the list.
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="success" onClick={handleCloseModal}>OK</Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </>
                                        ) : (
                                            /* Nominate the movie otherwise */
                                            <Button 
                                                    variant="primary"
                                                    onClick={() => handleAddNomination(movie)}
                                                >
                                                    Nominate
                                                </Button>
                                        )}
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                    :
                    <h5>{errorMessage}</h5>
                }
            </div>
        </div>
    )
}