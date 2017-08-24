import React, { Component } from 'react';
import searcher from './searcher';
import SearchResult from './search-result';
import './search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            q: '',
            placeholder: 'Search',
            soldListings: []
        };
    }

    render() {
        const listings = this.state.soldListings
            .map(l => (<SearchResult listing={l} key={l.id}/>));
        return (
            <div className="search">
                <form onSubmit={this.onSubmitSearch.bind(this)}>
                    <input type="text"
                           value={this.state.q}
                           onChange={this.onInputChange.bind(this)}
                           placeholder={this.state.placeholder}
                           ref={i => this.searchInput = i} />
                    <button onClick={this.search.bind(this)}>Search</button>
                    <div className="search__results">
                        {listings}
                    </div>
                </form>
            </div>
        );
    }

    onSubmitSearch(e) {
        e.preventDefault();
        this.search();
        this.searchInput.blur();
    }

    onInputChange(e) {
        this.setState({q: e.target.value});
    }

    search() {
        searcher.search(this.state.q)
            .then(listings => {
                this.setState({soldListings: listings});
            });
    }
}

export default Search;
