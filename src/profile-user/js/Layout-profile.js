import React, { Component } from 'react';
import "antd/dist/antd.css";
import "../css/Layout-profile.css"
import { Row, Col, Avatar, Tabs} from 'antd';
import {Container } from 'react-bootstrap';
import CreateForm from "./Create-News";
import ListNewsUser from "./ListNewsUser";
import {Link} from "react-router-dom";

class LayoutProfile extends Component {
    constructor(props) {
        super(props)
        this.state={
            api:"",
            hehe:[]
        }
    }

    componentWillMount() {
        this.getToken();
    }

    getToken = ()=>{
        const haha = sessionStorage.getItem('userData');
        this.setState({
           hehe: JSON.parse(haha)
        });
    };

    hihi = ()=> {
        const TabPane = Tabs.TabPane;
        return(
            <div>
                <Row className="p-2">
                    <Col lg={4}>
                        <Avatar size={128} icon="user" />
                    </Col>
                    <Col lg={14}>
                        <div className="userData mt-5">
                            <h2 className="d-block" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                <Link to={`#`}>{this.state.hehe.name}</Link>
                            </h2>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={24}>
                        <Tabs type="card">
                            <TabPane tab="Information user" key="1">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <Row >
                                            <Col md={4} lg={5}>
                                                <label className="font-weight-bold">Role</label>
                                            </Col>
                                            <Col md={20} lg={19}>
                                                <span>{this.state.hehe.role}</span>
                                            </Col>
                                        </Row>
                                    </li>
                                    <li className="list-group-item">
                                        <Row >
                                            <Col md={4} lg={5}>
                                                <label className="font-weight-bold">Email</label>
                                            </Col>
                                            <Col md={20} lg={19}>
                                                <span>{this.state.hehe.email}</span>
                                            </Col>
                                        </Row>
                                    </li>
                                    <li className="list-group-item">
                                        <Row >
                                            <Col md={4} lg={5}>
                                                <label className="font-weight-bold">Create-at</label>
                                            </Col>
                                            <Col md={20} lg={19}>
                                                <span>{this.state.hehe.created_at}</span>
                                            </Col>
                                        </Row>
                                    </li>
                                </ul>
                            </TabPane>

                            <TabPane tab="Create News" key="2">
                                <CreateForm/>
                            </TabPane>

                            <TabPane tab="List News" key="3">
                                <ListNewsUser/>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        )
    }
    render() {
        return (
            <div>
                <Container>
                    <div>
                        {this.hihi()}
                    </div>
                </Container>
            </div>
        )
    }
}
export default LayoutProfile;