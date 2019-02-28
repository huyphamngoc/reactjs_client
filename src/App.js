import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import { Row,Col } from 'antd';

class App extends Component {
  render() {

    return (
      <div className="gutter-example">
    <Row gutter={16}>
      <Col  className="gutter-row" span={6}>
        <div className="gutter-box">col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">col-6</div>
      </Col>
    </Row>
  </div>
    );
  }
}

export default App;
