import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import { toggleLoginMenu, logout } from '../redux/actions/userActions';

function Header(props) {
    function openMenu(e) {
        e.preventDefault();

        document
            .querySelector('.menu')
            .classList
            .toggle('open');
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

    return(
        <Fragment>
            <header className="header">
                <h1>Cheff Book</h1>

                <button className="header__btn" onClick={openMenu}>
                    <i className="fa fa-navicon"></i>
                </button>

                {userAuthenticated ? <button className="btn header__login" onClick={logout}>Logout</button> : <button className="btn header__login" onClick={openLogin}>Login</button>}
            </header>

            <Menu />
        </Fragment>
    );
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { toggleLoginMenu, logout })(Header);