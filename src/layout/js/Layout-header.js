import React, {Component} from 'react';
import '../css/Layout-header.css';
import "antd/dist/antd.css";
import {Row, Col} from 'antd';
import {Modal, Navbar, Form, Button, FormControl, Container} from 'react-bootstrap';
import axios from 'axios';
import {Link} from "react-router-dom";
import LoginRegister from './Login-Register';
import LoginLogout from './Login-Logout';

class LayoutHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            hasMore: true,
            loading: false,
            api: "https://smartnews.nal.vn/api/category",
            show: false,
        };

        this.handleShow = () => {
            this.setState({show: true});
        };

        this.handleHide = () => {
            this.setState({show: false});

        };

    }

    getNews = () => {
        axios.get(this.state.api)
            .then((response) => {
                const getCategory = response.data.data;
                this.setState({
                    category: getCategory
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getNews();
    }

    renderCategorySm = () => {
        return this.state.category.map((value) => {
            return (
                <Col xs={12} sm={12} md={6}>
                    <li className="nav-item  item-category-menu-sm">
                        <Link className="nav-link text-decoration-none" key={value.id} to={`/category/${value.id}`}
                        >
                            {value.name}
                        </Link>
                    </li>
                </Col>
            );
        });
    }

    renderCategoryPC = () => {
        return this.state.category.map((value) => {
            return (
                <li className="nav-item item-list-menu-category-pc pl-1 pr-1">
                    <Link className="nav-link text-white" key={value.id} to={`/category/${value.id}`}
                    >
                        {value.name}
                    </Link>
                </li>
            );
        });
    }


    render() {
        return (
            <div>
                <div className="layout-top-master-sm">
                    <Modal
                        show={this.state.show}
                        onHide={this.handleHide}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                      
                      <Modal.Body>
                        <LoginRegister style={{width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignCtems: 'center',
                                flexDirection: 'column',}} hide = {this.handleHide}/>
                      </Modal.Body>

                    </Modal>

                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand id="logo-header-sm" href="#home">
                            <Link to={`/`}>
                                <img className="d-inline-block align-top"
                                     src="https://res.cloudinary.com/aptech-fpt/image/upload/v1549933837/logo-nal.png" ></img>
                            </Link>
                        </Navbar.Brand>

                        {/*menu-nav-item-moblie*/}

                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Form inline>
                                <FormControl id="search-header-top-sm" type="text" placeholder="Search"/>
                                <Button variant="outline-success"><i className="fas fa-search"></i></Button>
                            </Form>

                            <Row>
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
                                            <Link to={`/`}>
                                                <img className="logo-top-pc"
                                                     src="https://res.cloudinary.com/aptech-fpt/image/upload/v1549933837/logo-nal.png"
                                                     alt="hihi"/>
                                            </Link>
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
                                                    <LoginLogout passedFunction={this.handleShow}/>
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
                                            <Link className="nav-link text-white" to="/">
                                                <i className=" fas fa-home"></i>
                                            </Link>
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