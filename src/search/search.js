import React, { Component } from 'react';
import searcher from './searcher';
import SearchResult from './search-result';
import './search.css';

class Search extends Component {
    state = {
        q: '',
        placeholder: 'Search',
        soldListings: [],
        searching: false
    };

    render() {
        const listings = this.state.soldListings
            .map(l => (<SearchResult listing={l} key={l.id}/>));
        const searchImage = this.state.searching ? 'hourglass' : 'search';
        return (
            <div>
                <form className="search" onSubmit={this.onSubmitSearch.bind(this)}>
                    <input type="text"
                           value={this.state.q}
                           onChange={this.onInputChange.bind(this)}
                           placeholder={this.state.placeholder}
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
