import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadMeals, setFilters } from './../redux/actions/mealActions';
import Meal from './Meal';

class Meals extends Component {
    state = {
        filters: []
    }

    componentDidMount() {
        this
            .props
            .loadMeals();
    }

    componentDidUpdate() {
        if(this.state.filters && !this.props.meals.filters.length) {
            this.props.setFilters(this.state.filters);
        }
    }

    render() {
        const { meals } = this.props.meals;

        return (
            <div className="meals">
                <div className="cols">
                    {
                        meals.map(meal => {
                            meal
                                .tags
                                .forEach(tag => {
                                    if(this.state.filters.indexOf(tag) === -1) {
                                       this
                                        .state
                                        .filters
                                        .push(tag);
                                    }
                                });

                            return(
                                <div key={meal._id} className="col col--1of4">
                                    <Meal
                                        name={meal.name}
                                        tags={meal.tags}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    meals: state.meals
});

export default connect(mapStateToProps, { loadMeals, setFilters })(Meals);