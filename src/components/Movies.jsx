import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function Movies({ movieList }) {
    console.log('movieList: ', movieList);
    return (
        <>
            {movieList ?
                movieList.map(movie => {
                    return (
                        <div key={movie.imdbID}>
                            <Card style={{ width: '12rem'}}>
                                <Card.Img variant="top" src={movie.Poster}/>
                                <Card.Body>
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <Button variant="primary">Nominate</Button>
                                </Card.Body>
                                {/* <img src={movie.Poster} />
                                <h1>{movie.Title}</h1> */}
                            </Card>
                        </div>
                    )
                })
                :
                <h1>There are no results</h1>
            }
            Movies
        </>
    )
}