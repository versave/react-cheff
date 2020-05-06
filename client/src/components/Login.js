import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="login popup">
                <div className="login__inner popup__inner">
                    <button className="popup__close">
                        <i className="fa fa-close"></i>
                    </button>

                    <form>
                        <h2>Login</h2>

                        <div className="login__row">
                            <label htmlFor="email">Email</label>

                            <input type="email" className="field" id="email" name="email" placeholder="Email" />
                        </div>
                        
                        <div className="login__row">
                            <label htmlFor="password">Password</label>

                            <input type="password" className="field" id="password" name="password" placeholder="Password" />
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

export default Login;