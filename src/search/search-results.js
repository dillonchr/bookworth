import React from 'react';
import { connect } from 'react-redux';
import './search-result.css';

const mapStateToProps = (state) => ({
    listings: state.filteredListings
});

export const SearchResult = ({listing, high}) => {
    const { sold, price, name, imageUrl, url, watchers } = listing;
    const statusClass = `search-result ${sold && 'sold'}`;
    return(
        <div className={statusClass}>
            <a href={url} target="_blank" className="search-result__thumb" style={{backgroundImage: `url(${imageUrl})`}}>&nbsp;</a>
            <div className="search-result__text">
                <p className="search-result__description">{name}</p>
            </div>
            <p className="search-result__price">
                {price}
                <div className="search-result__price-rank" style={{width: `${price / high * 100}%`}} />
            </p>
            <p className={`search-result__watchers ${!watchers && 'search-result__watchers--none'}`}>
                <p className="search-result__watchers-count">{watchers}</p>
                <svg className="search-result__watchers-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.85 488.85">
                    <path d="M244.425 98.725c-93.4 0-178.1 51.1-240.6 134.1-5.1 6.8-5.1 16.3 0 23.1 62.5 83.1 147.2 134.2 240.6 134.2s178.1-51.1 240.6-134.1c5.1-6.8 5.1-16.3 0-23.1-62.5-83.1-147.2-134.2-240.6-134.2zm6.7 248.3c-62 3.9-113.2-47.2-109.3-109.3 3.2-51.2 44.7-92.7 95.9-95.9 62-3.9 113.2 47.2 109.3 109.3-3.3 51.1-44.8 92.6-95.9 95.9zm-3.1-47.4c-33.4 2.1-61-25.4-58.8-58.8 1.7-27.6 24.1-49.9 51.7-51.7 33.4-2.1 61 25.4 58.8 58.8-1.8 27.7-24.2 50-51.7 51.7z"/>
                </svg>
            </p>
        </div>
    );
};

const SearchResults = ({listings}) => {
    const highPrice = listings.length && listings[0].price;
    return (
        <div className="search__results">
            {listings.map(l => <SearchResult listing={l} key={l.id} high={highPrice}/>)}
        </div>
    );
};

export default connect(mapStateToProps)(SearchResults);
