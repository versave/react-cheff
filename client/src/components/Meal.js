import React, { Component, Fragment } from 'react';
import Tag from './Tag';

class Meal extends Component {
    render() {
        return (
            <div className="meal">
                <div className="meal__image">
                    <img src="splash_nilfgaard.png" />
                </div>

                <div className="meal__content">
                    <h2>Спагети</h2>

                    <div className="meal__tags">
                        <Tag name={'Бързи'} />
                    </div>
                </div>

                <a className="meal__link"></a>
            </div>
        );
    }
}

export default Meal;