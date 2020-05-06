import React, { Component } from 'react';
import Meal from './Meal';

class Meals extends Component {
    render() {
        return (
            <div className="meals">
                <div className="cols">
                    <div className="col col--1of4">
                        <Meal />
                    </div>

                    <div className="col col--1of4">
                        <Meal />
                    </div>

                    <div className="col col--1of4">
                        <Meal />
                    </div>

                    <div className="col col--1of4">
                        <Meal />
                    </div>

                    <div className="col col--1of4">
                        <Meal />
                    </div>

                    <div className="col col--1of4">
                        <Meal />
                    </div>
                    <div className="col col--1of4">
                        <Meal />
                    </div>
                    <div className="col col--1of4">
                        <Meal />
                    </div>
                    <div className="col col--1of4">
                        <Meal />
                    </div>
                    <div className="col col--1of4">
                        <Meal />
                    </div>
                </div>
            </div>
        );
    }
}

export default Meals;