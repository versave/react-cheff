import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import Checkbox from './Checkbox';
import { toggleItemMenu, setMeal } from '../redux/actions/userActions';
import { filterTags } from '../redux/actions/mealActions';

class Menu extends Component {
    state = {
        filters: []
    }

    componentDidUpdate(prevState) {
        if(prevState.filters !== this.props.filters) {
            this.setState({filters: this.props.filters});
        }
    }

    openItemMenu = (e) => {
        e.preventDefault();
        this.props.toggleItemMenu(true);
    }

    filterMeals = (name, checked) => {
        this.props.filterTags(name, checked);
    }
    
    setRandomMeal = (e) => {
        e.preventDefault();

        const mealsLength = this.props.meals.length;
        const meal = this.props.meals[Math.floor(Math.random() * Math.floor(mealsLength))];

        this.props.setMeal(meal._id);
    }

    openMenu = (e) => {
        e.preventDefault();

        document
            .querySelector('.menu')
            .classList
            .toggle('open');
    }

    render() {
        const mealsLength = this.props.meals.length;

        const mealControls = (
            <Fragment>
                <Search />

                <div className="menu__filters">
                    <h2>Filters:</h2>

                    <div className="menu__checkboxes" data-simplebar>
                        <ul className="checkboxes">
                            {
                                this
                                    .state
                                    .filters
                                    .map((filter, index) => {
                                        return(
                                            <li key={index}>
                                                <Checkbox index={index} name={filter} activeFilters={this.props.activeFilters} onChange={this.filterMeals} />
                                            </li>
                                        );
                                    })
                            }
                        </ul>
                    </div>
                </div>
                
                <button className="btn" onClick={this.setRandomMeal}>Get a random meal</button>
            </Fragment>
        );

        return (
            <div className="menu">
                <button className="menu__close visible-xxs" onClick={this.openMenu}>
                    <i className="fa fa-close"></i>
                </button>

                <div className="menu__inner">
                    {this.props.user.isAuthenticated ? <button className="btn btn--white" onClick={this.openItemMenu}>Add meal</button> : null}

                    { mealsLength ? mealControls : <h3 className="menu__notice">Add meals<br />to unlock<br />further functionality</h3> }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.meals.filters,
    activeFilters: state.meals.activeFilters,
    user: state.user,
    meals: state.meals.meals
});

export default connect(mapStateToProps, { toggleItemMenu, filterTags, setMeal })(Menu);