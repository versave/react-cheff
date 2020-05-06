import React from 'react';

export default function Header() {
    function openMenu(e) {
        e.preventDefault();

        document
            .querySelector('.menu')
            .classList
            .toggle('open');
    }

    return(
        <header className="header">
            <h1>Cheff Book</h1>

            <button className="header__btn" onClick={openMenu}>
                <i className="fa fa-navicon"></i>
            </button>
        </header>
    );
}
