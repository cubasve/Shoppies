import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './Movies.css';
import  MoviePosterBackup from '..//MoviePosterBackup.png';

export default function Movies({ movieList }) {
    console.log('movieList: ', movieList);
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
                                    <Button variant="primary">Nominate</Button>
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