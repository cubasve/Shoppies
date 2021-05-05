import React from 'react';

export default function Search({ handleChange, handleSubmit, searchQuery }) {
    return (
        <form onSubmit={handleSubmit}>
            SearchBar
            <input 
                type="text"
                value={searchQuery}
                onChange={handleChange}
                //name="searchQuery"
            />
            <button type="submit">
                Search
            </button>
        </form>
    );
}