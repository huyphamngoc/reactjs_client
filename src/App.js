import React, {Component} from 'react';
import "antd/dist/antd.css";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import LayoutHeader from "./layout/js/Layout-header";
import LayoutFooter from "./layout/js/Layout-footer";
import ContentHompage from "./content/js/Content-homepage";
import ContentCaegoty from "./content/js/Content-Category";
import ContentDetail from "./content/js/Content-Detail";


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
                            <Route exact path="/category/:categoryId" component={ContentCaegoty}/>
                            <Route exac path="/news-detail/:newsId" render = {props => <ContentDetail {...props} />}/>
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
