import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMeal } from './../redux/actions/userActions';

class MealMenu extends Component {
    state = {
        editMode: false
    }

    toggleEditMode = (e) => {
        e.preventDefault();

        if(this.props.user.isAuthenticated) {
            this.setState({editMode: !this.state.editMode})
        }
    }

    closeMeal = () => this.props.setMeal(null);

    render() {
        const {
            id,
            name,
            image,
            image64,
            ingredients,
            tags,
            recipe
        } = this.props.user.openedMeal;
        let imageUrl = null;

        if(image && image64) {
            imageUrl = `data:image/jpg;base64,${this.props.image64}`;
        } else if(image) {
            imageUrl = `/api/meals/${id}/image`;
        }

        const showFileUpload = this.state.editMode ? (<div className="file">
            <input type="file" id="file" name="file" />

            <label htmlFor="file">
                <i className="fa fa-image"></i>

                Change
            </label>
        </div>) : null;

        return (
            <div className="popup popup--large">
                <div className="popup__inner">
                    <button className="popup__close" onClick={this.closeMeal}>
                        <i className="fa fa-close"></i>
                    </button>

                    <form className="form-meal">
                        <div className="form-meal__body">
                            <div className="form-meal__image">
                                {showFileUpload}

                                <figure style={{backgroundImage: `url(${imageUrl ? imageUrl : 'splash_nilfgaard.png'})`}}></figure>
                            </div>
                            
                            <div className="form-meal__content">
                                <h2>{name}</h2>

                                <h3>Ingredients:</h3>

                                <ol className="list">
                                    {
                                        ingredients.map((ingredient, index) => {
                                            return(
                                                <li key={`${ingredient}-${index}`}>{ingredient}</li>
                                            );
                                        })
                                    }
                                </ol>

                                <h3>Tags:</h3>

                                <ul className="list-inline">
                                    {
                                        tags.map((tag, index) => {
                                            return(
                                                <li key={`${tag}-${index}`}>
                                                    <div className="tag tag--white">{tag}</div>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>

                                <h3>Recipe</h3>

                                <p>{recipe}</p>

                                <div className="form-meal__actions">
                                    <button className="btn" onClick={this.toggleEditMode}>Edit</button>
                                </div>
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

export default connect(mapStateToProps, { setMeal })(MealMenu);