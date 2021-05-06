import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './Movies.css';
import  MoviePosterBackup from '..//MoviePosterBackup.png';

export default function Movies({ 
    handleAddNomination, movieList, nominations 
}) {
    //console.log('movieList: ', movieList);
    console.log('nominations: ', nominations)

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
                                    {nominations[movie.imdbID] ?
                                        <Button 
                                            variant="secondary"
                                            disabled
                                        >
                                            Nominated
                                        </Button>
                                    :
                                        <Button 
                                            variant="primary"
                                            onClick={() => handleAddNomination(movie)}
                                            //disabled
                                        >
                                            Nominate
                                        </Button>
                                    }
                                    {/* <Button 
                                        variant="primary"
                                        onClick={() => handleAddNomination(movie)}
                                    >
                                        Nominate
                                    </Button> */}
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