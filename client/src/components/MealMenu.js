import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setMeal } from './../redux/actions/userActions';
import { editMeal, deleteMeal } from './../redux/actions/mealActions';
import ErrorAlert from './ErrorAlert';

import { placeholderImage } from './Wrapper';

class MealMenu extends Component {
    state = {
        editMode: false,
        id: this.props.user.openedMeal._id,
        name: this.props.user.openedMeal.name,
        image: null,
        hasImage: this.props.user.openedMeal.hasImage,
        image64: this.props.user.openedMeal.image64,
        ingredients: [...this.props.user.openedMeal.ingredients, ''],
        tags: [...this.props.user.openedMeal.tags, ''],
        recipe: this.props.user.openedMeal.recipe,
        uploadBg: '',
        imageUpdated: false
    }

    toggleEditMode = (e) => {
        e.preventDefault();

        if(this.props.user.isAuthenticated) {
            this.setState({editMode: !this.state.editMode})
        }
    }

    closeMeal = () => this.props.setMeal(null);

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        if(e.target.type === 'file' && e.target.files[0] !== undefined) {
            this.setState({ image: e.target.files[0] });

            const reader = new FileReader();

            reader.onload = (e) => {
                this.setState({ uploadBg: e.target.result });
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        if(e.target.type === 'file' && e.target.files[0] !== undefined) {
            this.setState({image: e.target.files[0]});
            this.setState({imageUpdated: true});
            this.setState({hasImage: true});

            const reader = new FileReader();

            reader.onload = (e) => {
                this.setState({ uploadBg: e.target.result });
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    onArrayChange = (e) => {
        const target = e.target;
        const fields = target.parentNode.childNodes;

        fields.forEach((field, index) => {
            const type = target.getAttribute('id').split('-')[0];

            if(e.target.getAttribute('id') === field.getAttribute('id')) {
                this.setState(state => {
                    if(target.getAttribute('id').split('-')[0] === 'tags') {
                        state[type][index] = target.value.toLowerCase();
                    } else {
                        state[type][index] = target.value;
                    }

                    return state[type][index];
                })
            }
        });
    }

    onFocus = (e) => {
        const target = e.target;
        const fields = target.parentNode.childNodes;
        const length = fields.length;

        fields.forEach((field, index) => {
            const type = target.getAttribute('id').split('-')[0];

            if(target === field && index + 1 === length) {
                this.setState(state => {
                    state[type].push('');
                    return state[type];
                })
            }
        });
    }

    createFields = (arr, naming, placeholder) => {
        return (
            <div className="form-meal__container">
                {
                    arr.map((name, index) => {
                        return(
                                <input
                                    key={`${naming}-${index}`}
                                    type="text"
                                    className="field field--transparent"
                                    id={`${naming}-${index}`}
                                    name={`${naming}-${index}`}
                                    placeholder={placeholder}
                                    value={name ? name : ''}
                                    onFocus={this.onFocus}
                                    onChange={this.onArrayChange}
                                ></input>
                            
                        );
                    })
                }
            </div>
        );
    }

    onSubmit = (e) => {
        e.preventDefault();

        const ingredients = this.state.ingredients.filter(el => el === '' ? false : true);
        const tags = this.state.tags.filter(el => el === '' ? false : true);
        const meal = {
            id: this.state.id,
            name: this.state.name,
            image: this.state.image,
            hasImage: this.state.hasImage,
            ingredients,
            tags,
            recipe: this.state.recipe
        }

        this.validateInput(meal).then(() => {
            const formData = new FormData();

            formData.append('name', meal.name);
            formData.append('meal', meal.image);
            formData.append('hasImage', meal.hasImage);
            formData.append('ingredients', meal.ingredients);
            formData.append('tags', meal.tags);
            formData.append('recipe', meal.recipe);

            this.props.editMeal(meal.id, formData);
        })
        .catch(e => {
            this.setState({ msg: e });
        })
    }

    resetState = (e) => {
        e.preventDefault();

        const selectedMeal = this.props.user.openedMeal;
        
        Object.keys(this.state).map(key => {
            this.setState({editMode: false});
            this.setState(state => {
                if(key === 'ingredients' || key === 'tags') {
                    state[key] = [...selectedMeal[key], '']
                } else {
                    state[key] = selectedMeal[key];
                }

                return state;
            });
        })
    }

    validateInput(obj) {
        return new Promise((resolve, reject) => {
            Object.keys(obj)
                .forEach(key => {
                    if(obj[key] === '' || Array.isArray(obj[key]) && !obj[key].length) {
                        reject("Please don't leave empty main fields");
                    } else if(key === 'image' && obj[key] !== null && this.state.imageUpdated) {
                        if(!obj[key].type.match(/\/(jpg|jpeg|png)$/)) {
                            reject('File format must be .jpg, .jpeg or .png');
                        } else if(obj[key].size > 3000000){
                            reject('File size too large. Must be under 3mb.');
                        }
                    }
                });

            resolve();
        });
    }

    deleteMeal = (e) => {
        e.preventDefault();

        this.props.deleteMeal(this.props.user.openedMeal.id);
    }

    render() {
        const {
            id,
            name,
            hasImage,
            image64,
            ingredients,
            tags,
            recipe
        } = this.state;
        let imageUrl = null;

        if(hasImage && image64) {
            imageUrl = `data:image/jpg;base64,${this.props.user.openedMeal.image64}`;
        } else if(hasImage) {
            imageUrl = `/api/meals/${id}/image`;
        }

        if(this.state.imageUpdated) {
            imageUrl = this.state.uploadBg;
        }

        const showFileUpload = this.state.editMode ? (<div className="file">
            <input type="file" id="file" name="file" onChange={this.onChange} />

            <label htmlFor="file">
                <i className="fa fa-image"></i>

                Change
            </label>
        </div>) : null;

        const ingredientList = <ol className="list">
            {
                ingredients.map((ingredient, index) => {
                    if(ingredient !== '') {
                        return(
                            <li key={`${ingredient}-${index}`}>{ingredient}</li>
                        );
                    }
                })
            }
        </ol>;

        const tagList = <ul className="list-inline">
            {
                tags.map((name, index) => {
                    if(name !== '') {
                        return(
                            <li key={`${name}-${index}`}>
                                <div className="tag tag--white">{name}</div>
                            </li>
                        );
                    }
                })
            }
        </ul>;

        const editMode = this.state.editMode && this.props.user.isAuthenticated;
        const render = {
            name: editMode ? <input type="text" className="field field--transparent form-meal__title" id="name" name="name" placeholder="Name" value={name} onChange={this.onChange} /> : <h2>{name}</h2>,
            ingredients: editMode ? this.createFields(ingredients, 'ingredients', 'Ingredient') : ingredientList,
            tags: editMode ? this.createFields(tags, 'tags', 'Tag') : tagList,
            recipe: editMode ? <textarea className="field field--textarea field--transparent" id="recipe" name="recipe" placeholder="Recipe" value={recipe} onChange={this.onChange}></textarea> : <p>{recipe}</p>
        }
        const buttons = (
            <Fragment>
                {editMode ? <button type="submit" className="btn btn--white" onClick={this.onSubmit}>Save</button> : null}
                {
                    editMode ? <button className="btn" onClick={this.resetState}>Back</button>
                    : <button className="btn" onClick={this.toggleEditMode}>Edit</button>
                }
                {editMode ? <button className="btn btn--danger" onClick={this.deleteMeal}>Delete Meal</button> : null}
            </Fragment>
        );

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

                                <figure style={{backgroundImage: `url(${imageUrl ? imageUrl : placeholderImage})`}}></figure>
                            </div>
                            
                            <div className="form-meal__content">
                                {this.state.editMode && this.state.msg ? <ErrorAlert msg={this.state.msg} /> : null}

                                {render.name}

                                <h3>Ingredients:</h3>

                                {render.ingredients}

                                <h3>Tags:</h3>

                                {render.tags}

                                <h3>Recipe</h3>

                                {render.recipe}

                                <div className="form-meal__actions">
                                    {this.props.user.isAuthenticated ? buttons : null}
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

export default connect(mapStateToProps, { setMeal, editMeal, deleteMeal })(MealMenu);