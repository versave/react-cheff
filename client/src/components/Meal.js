import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMeal } from './../redux/actions/userActions'
import Tag from './Tag';

class Meal extends Component {
    constructor() {
        super();
    }

    openMeal = () => {
        const meal = this.props;
        this.props.setMeal(meal);
    }

    render() {
        let image = null;
        // let className = 'meal';
        // const boolsArr = [];
        // const { tags, filters } = this.props;

        if(this.props.image && this.props.image64) {
            image = `data:image/jpg;base64,${this.props.image64}`;
        } else if(this.props.image) {
            image = `/api/meals/${this.props.id}/image`;
        }

        // tags.forEach(tag => {
        //     if(filters.indexOf(tag) !== -1 && filters.length) {
        //         boolsArr.push(true);
        //     } else {
        //         boolsArr.push(false);
        //     }
        // });

        // if(boolsArr.indexOf(true) !== -1) {
        //     className = 'meal';
        // } else if(boolsArr.indexOf(true) === -1 && filters.length) {
        //     className = 'meal hidden';
        // }
        
        return (
            <div className="meal" onClick={this.openMeal}>
                <div className="meal__image">
                    <figure style={{backgroundImage: `url(${image ? image : 'splash_nilfgaard.png'})`}}></figure>
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
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps, { setMeal })(Meal);