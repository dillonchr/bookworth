import React from 'react';
import './search-result.css';

export const SearchResult = ({listing}) => {
    const { sold, price, name, imageUrl, url } = listing;
    const statusClass = `search-result ${sold && 'sold'}`;
    return(
        <div className={statusClass}>
            <div className="search-result__text">
                <p className="search-result__price">${price}</p>
                <p className="search-result__description">{name}</p>
            </div>
            <a href={url} target="_blank">
                <img className="search-result__thumb" alt={name} src={imageUrl} />
            </a>
        </div>
    );
};

export default ({listings}) => {
    return (
        <div className="search__results">
            {listings.map(l => <SearchResult listing={l} key={l.id}/>)}
        </div>
    );
};
