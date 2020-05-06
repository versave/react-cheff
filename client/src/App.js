import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Wrapper from './components/Wrapper';

import './App.scss';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Wrapper />
            </Provider>
        );
    }
}

export default App;