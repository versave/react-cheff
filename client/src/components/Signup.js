import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleSignupMenu } from '../redux/actions/userActions';
import { signup } from '../redux/actions/userActions';
import { clearErrors } from '../redux/actions/errorActions';
import ErrorAlert from './ErrorAlert';

class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        signup: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        if(prevProps.error.msg.message !== this.props.error.msg.message) {
            this.setState({msg: this.props.error.msg.message});
        }
    }

    closeLogin = (e) => {
        e.preventDefault();

        this.props.toggleSignupMenu(false);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        

        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };

        if(password !== this.state.repeatPassword) {
            this.setState({msg: 'Passwords must match'})
        } else {
            // Attempt to signup
            this.props.signup(user);
        }
    }

    render() {
        return (
            <div className="login popup">
                <div className="login__inner popup__inner">
                    <button className="popup__close" onClick={this.closeLogin}>
                        <i className="fa fa-close"></i>
                    </button>

                    <form onSubmit={this.onSubmit}>
                        <h2>Signup</h2>

                        {this.state.msg ? <ErrorAlert msg={this.state.msg} /> : null}

                        <div className="login__row">
                            <label htmlFor="name">Name</label>

                            <input type="text" className="field" id="name" name="name" placeholder="Name" onChange={this.onChange} />
                        </div>

                        <div className="login__row">
                            <label htmlFor="email">Email</label>

                            <input type="email" className="field" id="email" name="email" placeholder="Email" onChange={this.onChange} />
                        </div>
                        
                        <div className="login__row">
                            <label htmlFor="password">Password</label>

                            <input type="password" className="field" id="password" name="password" placeholder="Password" onChange={this.onChange} />
                        </div>

                        <div className="login__row">
                            <label htmlFor="repeatPassword">Repeat Password</label>

                            <input type="password" className="field" id="repeatPassword" name="repeatPassword" placeholder="Repeat Password" onChange={this.onChange} />
                        </div>

                        <div className="login__actions">
                            <button type="submit" className="btn">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    isAuthenticated: state.user.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { toggleSignupMenu, signup, clearErrors })(Signup);