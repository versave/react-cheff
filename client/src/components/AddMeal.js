import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleItemMenu } from '../redux/actions/userActions';

class AddMeal extends Component {
    state = {
        ingredients: [],
        tags: [],
        recipe: ''
    }

    openItemMenu = (e) => {
        e.preventDefault();
        this.props.toggleItemMenu(false);
    }

    render() {
        return (
            <div className="popup">
                <div className="popup__inner popup__inner--wide">
                    <button className="popup__close" onClick={this.openItemMenu}>
                        <i className="fa fa-close"></i>
                    </button>

                    <form className="form-add">
                        <h2>Add meal</h2>

                        <div className="form-add__container">
                            <div className="form-add__image">
                                <div className="form-add__row">
                                    <div className="file">
                                        <input type="file" id="file" name="file" />

                                        <label htmlFor="file">
                                            <i className="fa fa-image"></i>

                                            Upload
                                        </label>
                                    </div>

                                    <figure style={{backgroundImage: 'url(splash_nilfgaard.png)'}}></figure>
                                </div>
                            </div>

                            <div className="form-add__content">
                                <div className="form-add__row">
                                    <label htmlFor="name">Name</label>

                                    <input type="text" className="field" id="name" name="name" placeholder="Name" />
                                </div>

                                <div className="form-add__row">
                                    <label htmlFor="ingredient-0">Ingredients</label>

                                    <div className="form-add__group">
                                        <input type="text" className="field" id="ingredient-0" name="ingredient-0" placeholder="Ingredient" />
                                    </div>
                                </div>

                                <div className="form-add__row">
                                    <label htmlFor="tag-0">Tags</label>

                                    <div className="form-add__group">
                                        <input type="text" className="field" id="tag-0" name="tag-0" placeholder="Tag" />
                                    </div>
                                </div>

                                <div className="form-add__row">
                                    <label htmlFor="recipe">Recipe</label>

                                    <textarea className="field field--textarea" id="recipe" name="recipe" placeholder="Recipe"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="form-add__actions">
                            <button type="submit" className="btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { toggleItemMenu })(AddMeal);