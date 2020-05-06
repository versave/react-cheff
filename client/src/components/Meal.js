import React, { Component, Fragment } from 'react';
import Tag from './Tag';

class Meal extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="meal">
                <div className="meal__image">
                    <img src="splash_nilfgaard.png" />
                </div>

                <div className="meal__content">
                    <h2>{this.props.name}</h2>

                    <div className="meal__tags">
                        {
                            this
                                .props
                                .tags
                                .map((tag, index) => {
                                    return(
                                        <Tag key={index} name={tag} />
                                    );
                                })
                        }
                    </div>
                </div>

                <a className="meal__link"></a>
            </div>
        );
    }
}

export default Meal;