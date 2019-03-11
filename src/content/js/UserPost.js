import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class UserPost extends Component {
    
    render() {
        if(!sessionStorage.getItem('userData')){
          return (<Redirect to={'/'}/>)
        }
        
        return (
            <div>
            <div>UserPost</div>
            <button>CoMMIt POST</button>
            </div>
            );
    }
}

export default UserPost;