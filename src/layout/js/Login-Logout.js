import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class LoginLogout extends Component {
    logout = () => {
      sessionStorage.clear();
    }

    render (){
        if(sessionStorage.getItem('userData')){
            return (<div>
                <Link to={`/user`}>
                    <i id="login-pc-right" className="p-2 text-dark">
                    {JSON.parse(sessionStorage.getItem('userData')).name}
                    </i>
                </Link>
                
                <i id="login-pc-right" className="p-2 text-dark" onClick={this.logout}>
                Logout
                </i>
            </div>
                )
            
        }else {
            return <i id="login-pc-right"
               className="p-2 text-dark far fa-user" onClick={this.props.passedFunction}>
            </i>
        }
    }
}

export default LoginLogout;