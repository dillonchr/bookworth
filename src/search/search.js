import React from 'react';
import searcher from './searcher';
import SearchResults from './search-results';
import Filters from './filters';
import { connect } from 'react-redux';
import './search.css';

const mapStateToProps = state => ({
    listings: state.filteredListings,
    q: state.q,
    searching: state.isSearching
});

const Search = props => {
    const onInputChange = e => props.dispatch({type: 'search-input', value: e.target.value});

    const clear = e => e.preventDefault() || props.dispatch({type: 'clear-listings'});

    const search = () => {
        if (!props.searching && props.q) {
            props.dispatch({type: 'search-start'});
            searcher.search(props.q)
                .then(listings => props.dispatch({
                    type: 'search-results',
                    value: listings
                }));
        }
    };

    const onSubmitSearch = e => {
        e.preventDefault();
        search();
    };

    const searchIconName = props.searching ? 'hourglass' : 'search';

    return (
        <div>
            <form className='search' onSubmit={onSubmitSearch}>
                <input type='text'
                    value={props.q}
                    onChange={onInputChange}
                    placeholder='search eBay book listings'
                    className='search__input' />
                <input type='image'
                    alt='Search'
                    className='search__button'
                    src={`imgs/icon-${searchIconName}.gif`} />
                <input type='image'
                    alt='Clear'
                    src='imgs/icon-clear.gif'
                    className='search__button'
                    onClick={clear} />
            </form>
            <Filters />
            <SearchResults listings={props.listings} />
        </div>
    );
}

export default connect(mapStateToProps)(Search);
