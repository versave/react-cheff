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
                                        id={meal._id}
                                        name={meal.name}
                                        tags={meal.tags}
                                        ingredients={meal.ingredients}
                                        recipe={meal.recipe}
                                        image={meal.hasImage}
                                        image64={meal.image64}
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