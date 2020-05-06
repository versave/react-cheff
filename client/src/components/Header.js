import React, { Fragment } from 'react';
import Menu from './Menu';

export default function Header() {
    function openMenu(e) {
        e.preventDefault();

        document
            .querySelector('.menu')
            .classList
            .toggle('open');
    }

    return(
        <Fragment>
            <header className="header">
                <h1>Cheff Book</h1>

                <button className="header__btn" onClick={openMenu}>
                    <i className="fa fa-navicon"></i>
                </button>

                <button className="btn header__login">Login</button>
            </header>

            <Menu />
        </Fragment>
    );
}
