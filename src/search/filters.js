import React from 'react';
import './filters.css';

export const FilterOptions = {
    ALL: 0,
    SOLD: 1,
    LIVE: 2
};

export default ({currentFilter, onFilterChange}) => {
    const getOptionButton = label => {
        const filter = FilterOptions[label.toUpperCase()];
        const isSelected = currentFilter === filter;
        const className = `filter__option ${isSelected && 'filter__option--selected'}`;
        return <button className={className} onClick={() => onFilterChange({filter})}>{label}</button>;
    };
    
    return (
        <div className="filter">
            {getOptionButton('All')}
            {getOptionButton('Sold')}
            {getOptionButton('Live')}
        </div>
    );
};
