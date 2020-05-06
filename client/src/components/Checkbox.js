import React from 'react';

export default function Checkbox(props) {
    return(
        <div className="checkbox">
            <input type="checkbox" id={`tag-${props.index}`} name={`tag-${props.index}`} />

            <label htmlFor={`tag-${props.index}`}>{props.name}</label>
        </div>
    );
}
