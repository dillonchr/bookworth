import React, { Component } from 'react';
import searcher from './searcher';
import SearchResults from './search-results';
import './search.css';
import Filters, { FilterOptions } from './filters';

class Search extends Component {
    state = {
        q: '',
        listings: [],
        searching: false,
        filter: FilterOptions.ALL
    };

    getFilteredListings() {
        const { listings, filter } = this.state;
        return listings
            .filter(l => filter === FilterOptions.SOLD ? l.sold : (filter === FilterOptions.LIVE ? !l.sold : true));
    }

    blurInput = () => this.searchInput.blur();

    onSubmitSearch = e => {
        e.preventDefault();
        this.search();
        this.blurInput();
    };

    onInputChange = e => this.setState({q: e.target.value});

    clear = () => {
        this.setState({
            q: '',
            listings: []
        });
    };

    search() {
        if (!this.state.searching && this.state.q) {
            this.setState({
                searching: true
            });
            searcher.search(this.state.q)
                .then(listings => this.setState({
                        listings,
                        searching: false
                    }));
        }
    }

    render() {
        const searchIconName = this.state.searching ? 'hourglass' : 'search';
        return (
            <div>
                <form className='search' onSubmit={this.onSubmitSearch}>
                    <input type='text'
                           value={this.state.q}
                           onChange={this.onInputChange}
                           placeholder='search eBay book listings'
                           ref={i => this.searchInput = i}
                           className='search__input' />
                    <input type='image'
                         alt='Search'
                         className='search__button'
                         src={`imgs/icon-${searchIconName}.gif`} />
                    <input type='image'
                         alt='Clear'
                         src='imgs/icon-clear.gif'
                         className='search__button'
                         onClick={this.clear} />
                </form>
                <Filters currentFilter={this.state.filter} onFilterChange={f => this.setState(f)} />
                <SearchResults listings={this.getFilteredListings()} />
            </div>
        );
    }
}

export default Search;
