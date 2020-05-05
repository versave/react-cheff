import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import TestComponent from './components/TestComponent';

import './App.scss';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <TestComponent />
            </Provider>
        );
    }
}

export default App;