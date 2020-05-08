import React, { Component } from 'react';

export default function ErrorAlert(props) {
    return(
        <div className="error">
            <p>{props.msg}</p>
        </div>
    );
}