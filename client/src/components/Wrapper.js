import React, { Component } from 'react';
import { connect } from 'react-redux';

import TestComponent from './TestComponent';
import Header from './Header';
import Footer from './Footer';
import Meals from './Meals';
import Login from './Login';
import AddMeal from './AddMeal';
import MealMenu from './MealMenu';
import { loadUser } from './../redux/actions/userActions';

class Wrapper extends Component {
    componentDidMount() {
        this.props.loadUser();
    }

    render() {
        const { itemMenu, loginMenu } = this.props.user;

        return(
            <div className="wrapper">
                <Header />

                <main>
                    <Meals />            
                </main>

                {loginMenu ? <Login /> : null}
                {itemMenu ? <AddMeal /> : null}
                
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { loadUser })(Wrapper);