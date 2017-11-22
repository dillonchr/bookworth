import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { FilterOptions } from './search/filters';

const initialState = {
    filteredListings: [],
    listings: [],
    isSearching: false,
    filter: 0,
    q: ''
};

const resultsReducer = (state, action) => {
    switch(action.type) {
        case 'search-results':
        case 'filter':
            const { filter } = state;                
            return {
                ...state,
                filteredListings: state.listings
                    .filter(l => filter === FilterOptions.SOLD ? l.sold : (filter === FilterOptions.LIVE ? !l.sold : true))
            };
        case 'clear-listings':
            return {
                ...state,
                filteredListings: []
            };
        default:
            return state;
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'search-input':
            return {
                ...state,
                q: action.value
            };
        case 'search-start':
            return {
                ...state,
                isSearching: true
            };
        case 'filter':
            return resultsReducer({
                ...state,
                filter: action.value
            }, action);
        case 'search-results':
            return resultsReducer({
                ...state,
                listings: action.value,
                isSearching: false
            }, action);
        case 'clear-listings':
            return resultsReducer({
                ...state,
                listings: [],
                q: ''
            }, action);
        default:
            return state;
    }
};

const store = createStore(reducer);

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
