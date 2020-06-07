import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import Meals from './Meals';
import Login from './Login';
import Signup from './Signup';
import AddMeal from './AddMeal';
import MealMenu from './MealMenu';
import { loadUser } from './../redux/actions/userActions';
import Loader from './Loader';

export const placeholderImage = './placeholder.png';

class Wrapper extends Component {
    componentDidMount() {
        this.props.loadUser();
    }

    render() {
        const { itemMenu, signupMenu, loginMenu, openedMeal, isLoading, isAuthenticated } = this.props.user;
        const { loaded } = this.props.meal;
        const showLoader = !loaded && isAuthenticated || isLoading && isAuthenticated;

        return(
            <div className="wrapper">
                <Header />

                <main>
                    { isAuthenticated ? <Meals /> : <div style={{padding: '40px', fontSize: '30px', textAlign: 'center'}}>Please Signup or Login</div> }
                </main>
                
                {showLoader ? <Loader /> : null}
                
                {signupMenu ? <Signup /> : null}
                {loginMenu ? <Login /> : null}
                {itemMenu ? <AddMeal /> : null}
                {openedMeal ? <MealMenu /> : null}
                
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    meal: state.meals
});

export default connect(mapStateToProps, { loadUser })(Wrapper);