import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import './Search.css';

export default function Search({ 
    handleSearchQueryChange, handleSearchQuerySubmit, searchQuery 
}) {
    return (
        <Form onSubmit={handleSearchQuerySubmit}>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Form.Control 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchQueryChange(e)}
                        placeholder="Search for movies to nominate!"
                    />
                    <Form.Text>
                        Searching for movies named <strong>{searchQuery}</strong>...
                    </Form.Text>
                </Col>
            </Row>
            {/* <Button type="submit" variant="primary">
                Search
            </Button> */}
        </Form>
    );
}