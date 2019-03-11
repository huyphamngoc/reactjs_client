import React, { Component } from 'react';
import "antd/dist/antd.css";
import "../css/Layout-profile.css"
import { Row, Col, Avatar, Tabs} from 'antd';
import {Container } from 'react-bootstrap';

class LayoutProfile extends Component {
    constructor(props) {
        super(props)
        this.state={
            api:""
        }
    }
    render() {
        const TabPane = Tabs.TabPane;
        return (
            <div>
                <Container>
                    <Row className="p-2">
                        <Col lg={4}>
                            <Avatar size={128} icon="user" />
                        </Col>
                        <Col lg={14}>
                            <div className="userData mt-5">
                                <h2 className="d-block" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                    <a href="#">Some Name</a>
                                </h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Tabs type="card">
                                <TabPane tab="Information user" key="1">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <Row >
                                                <Col md={4} lg={5}>
                                                    <label className="font-weight-bold">Role</label>
                                                </Col>
                                                <Col md={20} lg={19}>
                                                    <span>Jamshaid Kamran</span>
                                                </Col>
                                            </Row>
                                        </li>
                                        <li className="list-group-item">
                                            <Row >
                                                <Col md={4} lg={5}>
                                                    <label className="font-weight-bold">Email</label>
                                                </Col>
                                                <Col md={20} lg={19}>
                                                    <span>Jamshaid Kamran</span>
                                                </Col>
                                            </Row>
                                        </li>
                                        <li className="list-group-item">
                                            <Row >
                                                <Col md={4} lg={5}>
                                                    <label className="font-weight-bold">Create-at</label>
                                                </Col>
                                                <Col md={20} lg={19}>
                                                    <span>Jamshaid Kamran</span>
                                                </Col>
                                            </Row>
                                        </li>
                                        <li className="list-group-item">
                                            <Row >
                                                <Col md={4} lg={5}>
                                                    <label className="font-weight-bold">Update-at</label>
                                                </Col>
                                                <Col md={20} lg={19}>
                                                    <span>Jamshaid Kamran</span>
                                                </Col>
                                            </Row>
                                        </li>
                                    </ul>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default LayoutProfile;