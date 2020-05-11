import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleItemMenu } from '../redux/actions/userActions';
import { addMeal } from '../redux/actions/mealActions';
import ErrorAlert from './ErrorAlert';

class AddMeal extends Component {
    state = {
        image: null,
        ingredients: [''],
        tags: [''],
        recipe: '',
        uploadBg: '',
        loading: false,
        msg: ''
    }

    openItemMenu = (e) => {
        e.preventDefault();
        this.props.toggleItemMenu(false);
    }

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

    validateInput(obj) {
        return new Promise((resolve, reject) => {
            Object.keys(obj)
                .forEach(key => {
                    if(obj[key] === '' || Array.isArray(obj[key]) && !obj[key].length) {
                        reject('Please fill all text fields');
                    } else if(key === 'image' && obj[key] !== null) {
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

    onSubmit = (e) => {
        e.preventDefault();

        const ingredients = this.state.ingredients.filter(el => el === '' ? false : true);
        const tags = this.state.tags.filter(el => el === '' ? false : true);
        const meal = {
            name: this.state.name,
            image: this.state.image,
            ingredients,
            tags,
            recipe: this.state.recipe
        }

        this.validateInput(meal).then(() => {
            const formData = new FormData();

            formData.append('name', meal.name);
            formData.append('meal', meal.image);
            formData.append('ingredients', meal.ingredients);
            formData.append('tags', meal.tags);
            formData.append('recipe', meal.recipe);

            this.props.addMeal(formData);
        })
        .catch(e => {
            this.setState({ msg: e });
        })
    }

    render() {
        const { ingredients, tags } = this.state;

        return (
            <div className="popup">
                <div className="popup__inner popup__inner--wide">
                    <button className="popup__close" onClick={this.openItemMenu}>
                        <i className="fa fa-close"></i>
                    </button>

                    <form className="form-add" onSubmit={this.onSubmit}>
                        <h2>Add meal</h2>

                        {this.state.msg ? <ErrorAlert msg={this.state.msg} /> : null}

                        <div className="form-add__container">
                            <div className="form-add__image">
                                <div className="form-add__row">
                                    <div className="file">
                                        <input type="file" id="file" name="file" onChange={this.onChange} />

                                        <label htmlFor="file">
                                            <i className="fa fa-image"></i>

                                            Upload
                                        </label>
                                    </div>

                                    <figure style={{backgroundImage: `url(${this.state.uploadBg !== '' ? this.state.uploadBg : 'splash_nilfgaard.png'})`}}></figure>
                                </div>
                            </div>

                            <div className="form-add__content">
                                <div className="form-add__row">
                                    <label htmlFor="name">Name</label>

                                    <input type="text" className="field" id="name" name="name" placeholder="Name" onChange={this.onChange} />
                                </div>

                                <div className="form-add__row">
                                    <label htmlFor="ingredient-0">Ingredients</label>

                                    <div className="form-add__group">
                                        {
                                            ingredients.map((name, index) => {
                                                return (
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        className="field"
                                                        id={`ingredients-${index}`}
                                                        name={`ingredient-${index}`}
                                                        placeholder="Ingredient"
                                                        onFocus={this.onFocus}
                                                        onChange={this.onArrayChange}
                                                    />
                                                );
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="form-add__row">
                                    <label htmlFor="tag-0">Tags</label>

                                    <div className="form-add__group">
                                        {
                                            tags.map((name, index) => {
                                                return (
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        className="field"
                                                        id={`tags-${index}`}
                                                        name={`tag-${index}`}
                                                        placeholder="Tag"
                                                        onFocus={this.onFocus}
                                                        onChange={this.onArrayChange}
                                                        style={{textTransform: 'lowercase'}}
                                                    />
                                                );
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="form-add__row">
                                    <label htmlFor="recipe">Recipe</label>

                                    <textarea className="field field--textarea" id="recipe" name="recipe" placeholder="Recipe" onChange={this.onChange}></textarea>
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

export default connect(mapStateToProps, { toggleItemMenu, addMeal })(AddMeal);