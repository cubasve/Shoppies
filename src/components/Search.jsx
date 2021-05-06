import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';

export default function Search({ 
    handleSearchQueryChange, handleSearchQuerySubmit, searchQuery 
}) {
    return (
        <Form 
            inline 
            //onSubmit={handleSearchQuerySubmit}
        >
            <Form.Row>
                <Form.Group as={Col} sm="20">
                    <Form.Control 
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        placeholder="Nominate a movie!"
                    />
                    {/* <Button type="submit" variant="primary">
                    Search
                    </Button> */}
                </Form.Group>
            </Form.Row>
            {/* SearchBar
            <FormControl 
                type="text"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                //name="searchQuery"
            />
            <Button type="submit" variant="primary">
                Search
            </Button> */}
        </Form>
    );
}