import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../src/content/css/Content-homepage.css';
import './content/js/Content-homepage';
import * as serviceWorker from './serviceWorker';
import ContentDetail from "./content/js/Content-Detail";
import App from "./App";
import LayoutProfile from "./profile-user/js/Layout-profile";

ReactDOM.render(
    <App/>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
