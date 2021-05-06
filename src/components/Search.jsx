import React from 'react';
import { Button } from 'react-bootstrap';

export default function Search({ 
    handleSearchQueryChange, handleSearchQuerySubmit, searchQuery 
}) {
    return (
        <form onSubmit={handleSearchQuerySubmit}>
            SearchBar
            <input 
                type="text"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                //name="searchQuery"
            />
            <Button type="submit" variant="primary">
                Search
            </Button>
        </form>
    );
}