import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import TestComponent from './components/TestComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Meal from './components/Meal';

import './App.scss';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="wrapper">
                    <Header />

                    <Menu />

                    <main>
                        <div className="meals">
                            <div className="cols">
                                <div className="col col--1of4">
                                    <Meal />
                                </div>

                                <div className="col col--1of4">
                                    <Meal />
                                </div>

                                <div className="col col--1of4">
                                    <Meal />
                                </div>

                                <div className="col col--1of4">
                                    <Meal />
                                </div>

                                <div className="col col--1of4">
                                    <Meal />
                                </div>

                                <div className="col col--1of4">
                                    <Meal />
                                </div>
                                <div className="col col--1of4">
                                    <Meal />
                                </div>
                                <div className="col col--1of4">
                                    <Meal />
                                </div>
                                <div className="col col--1of4">
                                    <Meal />
                                </div>
                                <div className="col col--1of4">
                                    <Meal />
                                </div>
                            </div>
                        </div>
                    </main>

                    <Footer />
                </div>
            </Provider>
        );
    }
}

export default App;