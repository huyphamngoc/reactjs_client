import React, {Component} from 'react';
import './App.css';
import "antd/dist/antd.css";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import LayoutHeader from "./layout/js/Layout-header";
import LayoutFooter from "./layout/js/Layout-footer";
import ContentHompage from "./content/js/Content-homepage";
import ContentCaegoty from "./content/js/Content-Category";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <div>
                        <LayoutHeader/>
                    </div>

                    <div className="main-route-place">
                        <Switch>
                            <Route exact path="/" component={ContentHompage}/>
                            <Route exact path="/category/:userId" render = {props => <ContentCaegoty {...props} />}/>
                        </Switch>
                    </div>

                    <div>
                        <LayoutFooter/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
