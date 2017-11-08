import React, { Component } from 'react';
import searcher from './searcher';
import SearchResult from './search-result';
import './search.css';

const FILTER_SETTINGS = {
    ALL: 0,
    SOLD: 1,
    LIVE: 2
};

class Search extends Component {
    state = {
        q: '',
        listings: [],
        searching: false,
        filter: FILTER_SETTINGS.ALL
    };

    getFilterOption(label) {
        const filter = FILTER_SETTINGS[label.toUpperCase()];
        const isSelected = this.state.filter === filter;
        const className = `filter__option ${isSelected && 'filter__option--selected'}`;
        return <button className={className} onClick={() => this.setState({filter})}>{label}</button>;
    }

    getFilteredListings() {
        const { listings, filter } = this.state;
        return listings
            .filter(l => filter === FILTER_SETTINGS.SOLD ? l.sold : (filter === FILTER_SETTINGS.LIVE ? !l.sold : true));
    }

    render() {
        const listings = this.getFilteredListings()
            .map(l => <SearchResult listing={l} key={l.id}/>);
        const searchIconName = this.state.searching ? 'hourglass' : 'search';
        return (
            <div>
                <form className="search" onSubmit={this.onSubmitSearch.bind(this)}>
                    <input type="text"
                           value={this.state.q}
                           onChange={this.onInputChange.bind(this)}
                           placeholder="search eBay book listings"
                           ref={i => this.searchInput = i}
                           className="search__input" />
                    <input type="image"
                         alt="Search"
                         className="search__button"
                         src={`imgs/icon-${searchIconName}.gif`} />
                    <input type="image"
                         alt="Clear"
                         src="imgs/icon-clear.gif"
                         className="search__button"
                         onClick={this.clear.bind(this)} />
                </form>
                <div className="filter">
                    {this.getFilterOption('All')}
                    {this.getFilterOption('Sold')}
                    {this.getFilterOption('Live')}
                </div>
                <div className="search__results">
                    {listings}
                </div>
            </div>
        );
    }

    blurInput() {
        this.searchInput.blur();
    }

    onSubmitSearch(e) {
        e.preventDefault();
        this.search();
        this.blurInput();
    }

    onInputChange(e) {
        this.setState({q: e.target.value});
    }

    clear() {
        this.setState({
            q: '',
            listings: []
        });
    }

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
}

export default Search;
