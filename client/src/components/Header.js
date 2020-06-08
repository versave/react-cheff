import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import { toggleSignupMenu, toggleLoginMenu, logout } from '../redux/actions/userActions';

function Header(props) {
    function openMenu(e) {
        e.preventDefault();

        document
            .querySelector('.menu')
            .classList
            .toggle('open');
    }

    function openSignup(e) {
        e.preventDefault();

        props.toggleSignupMenu(true);
    }

    function openLogin(e) {
        e.preventDefault();

        props.toggleLoginMenu(true);
    }

    function logout(e) {
        e.preventDefault();

        props.logout();
    }

    const userAuthenticated = props.user.isAuthenticated;
    const buttons = (
        <Fragment>
            <button className="btn header__login" onClick={openLogin}>Login</button>
            <button className="btn header__login" onClick={openSignup}>Signup</button>
        </Fragment>
    );
    const menuButton = (
        <button className="header__btn" onClick={openMenu}>
            <i className="fa fa-navicon"></i>
        </button>
    );

    return(
        <Fragment>
            <header className="header">
                {userAuthenticated ? <button className="btn header__login" onClick={logout}>Logout</button> : buttons}

                <h1>Cheff Book</h1>

                {userAuthenticated ? menuButton : null}
            </header>

            {userAuthenticated ? <Menu /> : null}
        </Fragment>
    );
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { toggleSignupMenu, toggleLoginMenu, logout })(Header);