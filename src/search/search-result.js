import React, {Component} from 'react';

export default class SearchResult extends Component {
    render() {
        const l = this.props.listing;
        const statusClass = `search-result ${l.sold ? 'sold' : ''}`;
        return(
            <div className={statusClass}>
                <div className="search-result__text">
                    <p className="search-result__price">${l.price}</p>
                    <p className="search-result__description">{l.name}</p>
                </div>
                <a href={l.url} target="_blank">
                    <img className="search-result__thumb" alt={l.name} src={l.imageUrl}/>
                </a>
            </div>
        );
    }
}