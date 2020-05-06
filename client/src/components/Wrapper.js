import React, { Component } from 'react';
import { connect } from 'react-redux';

import TestComponent from './TestComponent';
import Header from './Header';
import Footer from './Footer';
import Meals from './Meals';
import Login from './Login';
import AddMeal from './AddMeal';

class Wrapper extends Component {
    render() {
        const { itemMenu } = this.props.user;

        return(
            <div className="wrapper">
                <Header />

                <main>
                    <Meals />            
                </main>

                {itemMenu ? <AddMeal /> : null}
                
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { })(Wrapper);