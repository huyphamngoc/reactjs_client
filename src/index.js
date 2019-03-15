import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../src/content/css/Content-homepage.css';
import './content/js/Content-homepage';
import * as serviceWorker from './serviceWorker';
import App from "./App";
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import $ from 'jquery';
window.$ = $;


ReactDOM.render(
    <App/>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
