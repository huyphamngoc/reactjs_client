import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Login_Logout extends Component {


    logout = () => {
      // sessionStorage.setItem("userData",'');
      sessionStorage.clear();
      // this.setState({redirectToReferrer: true});
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

export default Login_Logout;