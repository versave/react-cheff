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
        const filters = this.props.meals.activeFilters;
        let className = 'col col--1of4';

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
                            
                            const boolsArr = [];
                            const tags = meal.tags;

                            tags.forEach(tag => {
                                if(filters.indexOf(tag) !== -1 && filters.length) {
                                    boolsArr.push(true);
                                } else {
                                    boolsArr.push(false);
                                }
                            });
                    
                            if(boolsArr.indexOf(true) !== -1) {
                                className = 'col col--1of4';
                            } else if(boolsArr.indexOf(true) === -1 && filters.length) {
                                className = 'col col--1of4 hidden';
                            }

                            return(
                                <div key={meal._id} className={className}>
                                    <Meal
                                        id={meal._id}
                                        name={meal.name}
                                        tags={meal.tags}
                                        ingredients={meal.ingredients}
                                        recipe={meal.recipe}
                                        image={meal.hasImage}
                                        image64={meal.image64}
                                        filters={this.props.meals.activeFilters}
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