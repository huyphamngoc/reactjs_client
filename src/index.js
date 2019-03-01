import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../src/content/css/Content-homepage.css';
import './content/js/Content-homepage';
import * as serviceWorker from './serviceWorker';
import ContentHompage from "../src/content/js/Content-homepage.js";
import LayoutHeader from "./layout/js/Layout-header";
import App from "./App";
import {Router, Route ,BrowserRouter} from "react-router-dom";
import News from "./News";

ReactDOM.render(
    <App/>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
