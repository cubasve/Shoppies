import React, { useState } from 'react';
import { Button, Card, Image, Modal, Table } from 'react-bootstrap';
import './Movies.css';
//import MoviePosterBackup from './MoviePosterBackup.png';

export default function Movies({ 
    handleAddNomination, movieList, nominations 
}) {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);

    return (
        <div className="movies">
            {movieList ?
                movieList.map(movie => {
                    return (
                        <div key={movie.imdbID}>
                            <Card style={{ width: '16rem'}}>
                                    {/* If there is no image for the movie, show the backup picture */}
                                    {movie.Poster ? 
                                    <Card.Img variant="top" src={movie.Poster}/> : 
                                    <Card.Img variant="top" src="./MoviePosterBackup.png" />
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
                                    
                                        {/* <Button 
                                    //             variant="primary"
                                    //             onClick={() => (
                                    //                 nominations.length === 5 ? (
                                    //                     handleOpenModal(),
                                    //                     handleMaximumNominations()
                                    //                 ) : (
                                    //                     handleAddNomination(movie)
                                    //                 )
                                    //             )}
                                    //         >
                                    //             Nominate
                                    //         </Button> 
                                    // } */}

                                </Card.Body>
                            </Card>
                        </div>
                    )
                })
                :
                <h4>There are no results</h4>
            }
            Movies
        </div>
    )
}