import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import Checkbox from './Checkbox';
import { toggleItemMenu } from '../redux/actions/userActions';
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

    render() {
        return (
            <div className="menu">
                <div className="menu__inner">
                    {this.props.user.isAuthenticated ? <button className="btn btn--white" onClick={this.openItemMenu}>Add meal</button> : null}

                    <Search />

                    <div className="menu__filters">
                        <h2>Filters:</h2>

                        <ul className="checkboxes">
                            {
                                this
                                    .state
                                    .filters
                                    .map((filter, index) => {
                                        return(
                                            <li key={index}>
                                                <Checkbox index={index} name={filter} onChange={this.filterMeals} />
                                            </li>
                                        );
                                    })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.meals.filters,
    user: state.user
});

export default connect(mapStateToProps, { toggleItemMenu, filterTags })(Menu);