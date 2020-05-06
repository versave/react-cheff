import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div className="search">
                <input type="search" id="search" name="search" placeholder="Search..." />

                <button type="sumbit">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        );
    }
}

export default Search;