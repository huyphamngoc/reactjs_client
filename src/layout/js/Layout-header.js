import React, { Component } from 'react';
import '../css/Layout-header.css';
import "antd/dist/antd.css";
import {Row,Col } from 'antd';
import { Navbar,Form,Button,FormControl, Container} from 'react-bootstrap';
import axios from 'axios';
import LayoutFooter from "./Layout-footer";

class LayoutHeader extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            category: [],
            hasMore: true,
            loading: false,
            api: "https://nalvnsmartnews.herokuapp.com/api/category"
        };

    }

    getNews = ()=>{
        axios.get(this.state.api)
            .then((response) => {
                    const getCategory = response.data.data;
                    this.setState({
                        category : getCategory
                    })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getNews();
    }

    renderCategorySm =()=> {
        return this.state.category.map((value, index) => {
            return (
                <Col xs={12} sm={12} md={6} >
                    <li className="nav-item  item-category-menu-sm">
                        <a className="nav-link text-decoration-none" id={value.id} href="#">{value.name}</a>
                    </li>
                </Col>
            );
        });
    }

    renderCategoryPC =()=> {
        return this.state.category.map((value, index) => {
            return (
                <li className="nav-item item-list-menu-category-pc pl-1 pr-1">
                    <a className="nav-link text-white" href="#">
                        {value.name}
                    </a>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="layout-top-master-sm">
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand id="logo-header-sm" href="#home">
                                <img  className="d-inline-block align-top" src="https://res.cloudinary.com/aptech-fpt/image/upload/v1549933837/logo-nal.png"></img>
                            </Navbar.Brand>

                            {/*menu-nav-item-moblie*/}

                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse  id="basic-navbar-nav">
                                <Form inline>
                                    <FormControl id="search-header-top-sm" type="text" placeholder="Search" />
                                    <Button variant="outline-success"><i className="fas fa-search"></i></Button>
                                </Form>

                                <Row >
                                <ul className="mt-2 nav nav-pills nav-fill">
                                    {this.renderCategorySm()}
                                </ul>
                                </Row>
                            </Navbar.Collapse>
                        </Navbar>
                </div>
                <div className="layout-top-master-pc pt-2 pb-2">
                    <div>
                        <Container>
                            <Row>
                                <Col lg={6}>
                                    <h3>
                                        <a href="#">
                                            <img className="logo-top-pc"
                                                 src="https://res.cloudinary.com/aptech-fpt/image/upload/v1549933837/logo-nal.png"
                                                 alt="hihi"/>
                                        </a>
                                    </h3>
                                </Col>

                                <Col lg={10} >
                                    <Row>
                                        <form action="#" className="pt-3">
                                            <Col lg={20}>
                                                <div className="form-group">

                                                    <input type="text" id="input-search-top-pc" className="form-control"
                                                           placeholder="Nhập nội dung tìm kiếm"/>
                                                </div>
                                            </Col>

                                            <Col lg={3}>
                                                <button type="submit" id="btn-search-top-pc" className=" btn btn-light"><i className="fas fa-search"></i></button>
                                            </Col>
                                        </form>
                                    </Row>
                                </Col>
                                <Col lg={8}>
                                    <div className="pt-3 ">
                                        <ul className="nav justify-content-end">
                                            <li className=" nav-item">
                                                <a className="nav-link" href="#">
                                                    <i id="login-pc-right"
                                                       className="p-2 text-dark far fa-user">
                                                    </i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    <div className="layout-category-top-pc">
                        <Container>
                            <Row>
                                <ul className="nav list-menu-category-pc">
                                    <li className="nav-item item-list-menu-category-pc pl-1 pr-1">
                                        <a className="nav-link text-white" href="#">
                                            <i className=" fas fa-home"></i>
                                        </a>
                                    </li>
                                    {this.renderCategoryPC()}
                                </ul>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
}
export default LayoutHeader;