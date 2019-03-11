import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class UserDetail extends Component {
    
    render() {

        if(!sessionStorage.getItem('userData')){
          return (<Redirect to={'/'}/>)
        }
        return (
            <div>
            <div>UserDetail</div>
            <Link to={`/user/post`}>
                    <button>POST</button>
                </Link>
            
            </div>
            );
    }
}

export default UserDetail;