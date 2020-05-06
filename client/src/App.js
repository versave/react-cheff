import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import TestComponent from './components/TestComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import Meals from './components/Meals';
import Login from './components/Login';

import './App.scss';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="wrapper">
                    <Header />

                    <main>
                        <Meals />            
                    </main>
                    
                    <Footer />
                </div>
            </Provider>
        );
    }
}

export default App;