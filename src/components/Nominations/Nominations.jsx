import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './Nominations.css';

export default function Nominations({ 
    handleDeleteNomination, nominations 
}) {
    return (
        <div className="nominations">
            <h4>Nominations</h4>
            <div className="nominationlist">
                {nominations.length ?
                    nominations.map(nomination => {
                        return (
                            <div key={nomination.imdbID}>
                                <Card style={{ width: '14rem' }} className="text-center">
                                    {/* If there is no image for the movie, show the backup picture */}
                                    {nomination.Poster !== "N/A" ? 
                                        <Card.Img variant="top" src={nomination.Poster}/> : 
                                        <Card.Img variant="top" style={{ height: "18rem"}} src="./MoviePosterBackup.jpeg" />
                                    }
                                    <Card.Body>
                                        <Card.Title>{nomination.Title}</Card.Title>
                                        <Card.Text>{nomination.Year}</Card.Text>
                                        <Button
                                            variant="danger"
                                            onClick={handleDeleteNomination}
                                            value={nomination.imdbID}
                                        >
                                            Remove
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                :
                <h4>No Nominations Yet!</h4>
                }
            </div>
        </div>
    )
}