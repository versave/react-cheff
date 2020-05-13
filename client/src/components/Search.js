import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchMeals } from './../redux/actions/mealActions';

class Search extends Component {
    state = {
        search: ''
    }

    onChange = (e) => {
        this.setState({search: e.target.value});
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        this.props.searchMeals(this.state.search);
    }

    render() {
        return (
            <div className="search">
                <form onSubmit={this.onSubmit}>
                    <input type="search" id="search" name="search" placeholder="Search..." onChange={this.onChange} />

                    <button type="sumbit">
                        <i className="fa fa-search"></i>
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    meals: state.meals
});

export default connect(mapStateToProps, { searchMeals })(Search);