import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function Nominations({ handleDeleteNomination, nominations }) {
    return (
        <>
            {nominations.length ?
                nominations.map(nomination => {
                    return (
                        <div key={nomination.imdbID}>
                            <Card style={{ width: '16rem' }}>
                                <Card.Body>
                                    <Card.Title>{nomination.Title}</Card.Title>
                                    <Card.Text>{nomination.Year}</Card.Text>
                                    <Button
                                        variant="danger"
                                        //onClick={handleDeleteNomination}
                                    >
                                        Remove
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })
            :
            <h3>No Nominations Yet!</h3>
            }
        </>
    )
}