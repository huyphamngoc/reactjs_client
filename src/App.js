import React, {Component} from 'react';
import "antd/dist/antd.css";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import LayoutHeader from "./layout/js/Layout-header";
import LayoutFooter from "./layout/js/Layout-footer";
import ContentHompage from "./content/js/Content-homepage";
import ContentCaegoty from "./content/js/Content-Category";
import ContentDetail from "./content/js/Content-Detail";
import UserDetail from "./content/js/UserDetail";
import UserPost from "./content/js/UserPost";
import LayoutProfile from "./profile-user/js/Layout-profile";
import RegisterUser from "./profile-user/js/Register-User";

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
                            <Route exact path="/user" component={UserDetail}/>
                            <Route exact path="/user/post" component={UserPost}/>
                            <Route exact path="/profile" render = {props => <LayoutProfile {...props} />}/>
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
