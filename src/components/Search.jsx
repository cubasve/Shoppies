import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';

export default function Search({ 
    handleSearchQueryChange, searchQuery 
}) {
    return (
        <Form inline>
            <Form.Row>
                <Form.Group as={Col} sm="40">
                    <Form.Control 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchQueryChange(e)}
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