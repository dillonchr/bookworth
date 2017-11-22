import React from 'react';
import './filters.css';
import { connect } from 'react-redux';

export const FilterOptions = {
    ALL: 0,
    SOLD: 1,
    LIVE: 2
};

const mapStateToProps = state => ({
    currentFilter: state.filter
});

const Filters = ({dispatch, currentFilter, onFilterChange}) => {
    const getOptionButton = label => {
        const filter = FilterOptions[label.toUpperCase()];
        const isSelected = currentFilter === filter;
        const className = `filter__option ${isSelected && 'filter__option--selected'}`;
        return <button className={className} onClick={() => dispatch({ type: 'filter', value: filter })}>{label}</button>;
    };
    
    return (
        <div className="filter">
            {getOptionButton('All')}
            {getOptionButton('Sold')}
            {getOptionButton('Live')}
        </div>
    );
};

export default connect(mapStateToProps)(Filters);
