import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleLoginMenu } from '../redux/actions/userActions';
import { login } from '../redux/actions/userActions';
import { clearErrors } from '../redux/actions/errorActions';
import ErrorAlert from './ErrorAlert';

class Login extends Component {
    state = {
        email: '',
        password: '',
        msg: null
    };
    
    componentDidUpdate(prevProps) {
        if(prevProps.error.msg.message !== this.props.error.msg.message) {
            this.setState({msg: this.props.error.msg.message});
        }
    }

    closeLogin = (e) => {
        e.preventDefault();

        this.props.toggleLoginMenu(false);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;
        const user = {
            email,
            password
        };

        // Attempt to login
        this.props.login(user);
    }

    render() {
        return (
            <div className="login popup">
                <div className="login__inner popup__inner">
                    <button className="popup__close" onClick={this.closeLogin}>
                        <i className="fa fa-close"></i>
                    </button>

                    <form onSubmit={this.onSubmit}>
                        <h2>Login</h2>

                        {this.state.msg ? <ErrorAlert msg={this.state.msg} /> : null}

                        <div className="login__row">
                            <label htmlFor="email">Email</label>

                            <input type="email" className="field" id="email" name="email" placeholder="Email" onChange={this.onChange} />
                        </div>
                        
                        <div className="login__row">
                            <label htmlFor="password">Password</label>

                            <input type="password" className="field" id="password" name="password" placeholder="Password" onChange={this.onChange} />
                        </div>

                        <div className="login__actions">
                            <button type="submit" className="btn">Login</button>
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

export default connect(mapStateToProps, { toggleLoginMenu, login, clearErrors })(Login);