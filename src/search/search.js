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
        placeholder: 'Search',
        soldListings: [],
        searching: false,
        filterResults: 0
    };

    getFilterOption(label) {
        const optionValue = FILTER_SETTINGS[label.toUpperCase()];
        const isSelected = this.state.filterResults === optionValue;
        const className = `filter__option ${isSelected && 'filter__option--selected'}`;
        return <button className={className} onClick={() => this.setFilter(optionValue)}>{label}</button>;
    }

    setFilter(f) {
        this.setState({
            filterResults: f
        });
    }

    getFilteredListings() {
        const l = this.state.soldListings;
        const f = this.state.filterResults;
        if (f === FILTER_SETTINGS.SOLD) {
            return l.filter(l => l.sold);
        }
        if (f === FILTER_SETTINGS.LIVE) {
            return l.filter(l => !l.sold);
        }
        return l;
    }

    render() {
        const listings = this.getFilteredListings()
            .map(l => (<SearchResult listing={l} key={l.id}/>));
        const searchImage = this.state.searching ? 'hourglass' : 'search';
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
                         src={`imgs/icon-${searchImage}.gif`} />
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
            soldListings: []
        });
    }

    search() {
        if (!!this.state.q) {
            this.setState({
                searching: true
            }, () => searcher.search(this.state.q)
                .then(listings => {
                    this.setState({
                        soldListings: listings,
                        searching: false
                    });
                }));
        }
    }
}

export default Search;
