import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleItemMenu } from '../redux/actions/userActions';

class MealMenu extends Component {
    render() {
        return (
            <div className="popup popup--large">
                <div className="popup__inner">
                    <button className="popup__close" onClick={this.openItemMenu}>
                        <i className="fa fa-close"></i>
                    </button>

                    <form className="form-meal">
                        <div className="form-meal__body">
                            <div className="form-meal__image">
                                <div className="file">
                                    <input type="file" id="file" name="file" />

                                    <label htmlFor="file">
                                        <i className="fa fa-image"></i>

                                        Change
                                    </label>
                                </div>

                                <figure style={{backgroundImage: 'url(splash_nilfgaard.png)'}}></figure>
                            </div>
                            
                            <div className="form-meal__content">
                                <h2>Таратор</h2>

                                <h3>Ingredients:</h3>

                                <ol className="list">
                                    <li>Мляко</li>
                                    <li>Краставица</li>
                                    <li>Краставица</li>
                                    <li>Краставица</li>
                                    <li>Краставица</li>
                                    <li>Краставица</li>
                                    <li>Краставица</li>
                                    <li>Краставица</li>
                                    <li>Краставица</li>
                                    <li>Краставица</li>
                                </ol>

                                <h3>Tags:</h3>

                                <ul className="list-inline">
                                    <li>
                                        <div className="tag tag--white">Бърз</div>
                                    </li>
                                    <li>
                                        <div className="tag tag--white">Закуска</div>
                                    </li>
                                    <li>
                                        <div className="tag tag--white">Обяд</div>
                                    </li>
                                </ul>

                                <h3>Recipe</h3>

                                <p>
                                    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                                    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                                    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                                    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                                    lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    meals: state.meals
});

export default connect(mapStateToProps, {  })(MealMenu);