import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class LoginLogout extends Component {
    logout = () => {
        sessionStorage.clear();
    }

    render() {
        if (sessionStorage.getItem('userData')) {
            return (
                <div>
                    <Link href="/" to="/">
                        <i id="login-pc-right" className="p-2 text-dark">
                            {JSON.parse(sessionStorage.getItem('userData')).name}
                        </i>
                    </Link>

                    <Link href="/" to="/">
                        <i id="login-pc-right" className="p-2 text-dark" onClick={this.logout}>
                            Logout
                        </i>
                    </Link>
                </div>
            )

        } else {
            return <i id="login-pc-right"
                      className="p-2 text-dark far fa-user" onClick={this.props.passedFunction}>
            </i>
        }
    }
}

export default LoginLogout;