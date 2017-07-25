import React, {Component} from 'react';

export default class SearchResult extends Component {
    render() {
        const l = this.props.listing;
        return(
            <div className="search-result">
                <div className="search-result__text">
                    <p className="search-result__price">${l.price}</p>
                    <p className="search-result__description">{l.name}</p>
                </div>
                <img className="search-result__thumb" src={l.imageUrl}/>
            </div>
        );
    }
}