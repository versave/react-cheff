import React from 'react';

export default function Checkbox(props) {
    let checked = false;

    props.activeFilters.forEach(filter => {
        if(filter === props.name) {
            checked = true;
        }
    });

    return(
        <div className="checkbox">
            <input type="checkbox" id={`tag-${props.index}`} name={`tag-${props.index}`} checked={checked} onChange={(e) => props.onChange(props.name, e.target.checked)} />

            <label htmlFor={`tag-${props.index}`}>{props.name}</label>
        </div>
    );
}
