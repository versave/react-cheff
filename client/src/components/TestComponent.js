import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
//import { changeString } from '../redux/actions/itemActions';

class TestComponent extends Component {
    state = {
        testVar: 'Test state string'
    }

    handleChange = (e) => {
        //this.props.changeString(e.target.value);
    }

    render() {
        console.log(this.props);

        return (
            <Fragment>
                <h1>{this.state.testVar}</h1>

                <p>Redux state edited string: <strong>{this.props.items.testString}</strong></p>

                <input type="text" onChange={this.handleChange} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    items: state.items
});

//export default connect(mapStateToProps, { changeString })(TestComponent);