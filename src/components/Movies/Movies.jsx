import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import './Movies.css';
import  MoviePosterBackup from '..//MoviePosterBackup.png';

export default function Movies({ 
    handleAddNomination, movieList, nominations 
}) {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);

    const handleMaximumNominations = () => {
        handleOpenModal();
        return (
            <Modal 
                showModal={showModal}
                onHide={handleCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>You can only have 5 nominations</Modal.Title>
                    <Modal.Body>Eva</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Ok</Button>
                    </Modal.Footer>
                </Modal.Header>
            </Modal>
        )
    }

    return (
        <div className="movies">
            {movieList ?
                movieList.map(movie => {
                    return (
                        <div key={movie.imdbID}>
                            <Card style={{ width: '16rem'}}>
                                    {/* If there is no image for the movie*/}
                                    {movie.Poster ? 
                                    <Card.Img variant="top" src={movie.Poster}/> : 
                                    <Card.Img variant="top" src={MoviePosterBackup}/>
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
                                    /* If there are already 5 nominations */
                                    : nominations.length === 5 ? (
                                            <>
                                                <Button 
                                                    variant="primary"
                                                    onClick={handleOpenModal}
                                                >
                                                    Nominate
                                                </Button>
                                                <Modal 
                                                    showModal={showModal}
                                                    onHide={handleCloseModal}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>You can only have 5 nominations</Modal.Title>
                                                        <Modal.Body>Eva</Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleCloseModal}>OK</Button>
                                                        </Modal.Footer>
                                                    </Modal.Header>
                                                </Modal>
                                            </>
                                    ) : (
                                         <Button 
                                                    variant="primary"
                                                    onClick={() => handleAddNomination(movie)}
                                                >
                                                    Nominate
                                                </Button>
                                    )}
                                            {/* //  <Button 
                                            //     variant="primary"
                                            //     onClick={() => {
                                            //         nominations.length === 5 ? 
                                            //         handleMaximumNominations() : 
                                            //         handleAddNomination(movie)
                                            //     }}
                                            // >
                                            //     Nominate
                                            // </Button> */}

                                </Card.Body>
                            </Card>
                        </div>
                    )
                })
                :
                <h3>There are no results</h3>
            }
            Movies
        </div>
    )
}