import React, { Component } from 'react';
import searcher from './searcher';

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
        const listings = this.state.soldListings.map(l => (<div key={l.id}>{l.name}</div>));
        return (
            <div className="search">
                <input type="text"
                       value={this.state.q}
                       onChange={this.onInputChange.bind(this)}
                       placeholder={this.state.placeholder} />
                <button onClick={this.search.bind(this)}>Search</button>
                <div className="search__results">
                    {listings}
                </div>
            </div>
        );
    }

    onInputChange(e) {
        this.setState({q: e.target.value});
    }

    search() {
        searcher.search(this.state.q)
            .then(([sold, live]) => {
                this.setState({soldListings: sold});
            });
    }
}

export default Search;
