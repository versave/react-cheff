import React from 'react';

export default function Checkbox(props) {
    return(
        <div className="checkbox">
            <input type="checkbox" id={`tag-${props.index}`} name={`tag-${props.index}`} onChange={(e) => props.onChange(props.name, e.target.checked)} />

            <label htmlFor={`tag-${props.index}`}>{props.name}</label>
        </div>
    );
}
