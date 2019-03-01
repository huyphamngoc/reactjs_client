import React, {Component} from 'react';
import '../css/Content-homepage.css';
import "antd/dist/antd.css";
import {Row, Col} from 'antd';
import {Container,} from 'react-bootstrap';
import axios from "axios";

class ContentHompage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            api: "https://smartnews.nal.vn/api/news"
        };
    }

    getNews = () => {
        axios.get(this.state.api)
            .then((response) => {
                const getNews = response.data.data.data;
                 console.log(getNews);
                this.setState({
                    news: getNews
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getNews();
    }

    renderNewsLeftFeature = () => {
        return this.state.news.map((value, index) => {
            return (
                <li id="haha" className=" list-group-item">
                    <Row>
                        <Col lg={6} sm={8} xs={10} className="pr-lg-2  pr-sm-2 pr-xl-2">
                            <a href="#"><img className="huy123" src={value.img}
                                             alt=""/></a>
                        </Col>

                        <Col lg={18} sm={16}>

                            <h4 className="title-text-item-content-fl">
                                <a href="#">{value.title}</a>
                            </h4>

                            <div className="text-item-content-fl">
                                <div className="categoty-item-content-fl mb-lg-1">
                                    <a className="" href="#">{value.category_name}</a>
                                </div>
                                <span className="description-item-content-fl">
                                   {value.description}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </li>

            );
        });
    }

    renderNewsRightFeature= ()=>{
        return this.state.news.map((value, index) => {
            return (
                <li className="list-group-item">
                    <Row>
                        <Col lg={9} className=" pr-lg-1">
                            <a href="#"><img className="img-fluid"
                                src={value.img}
                                alt=""/>
                            </a>
                        </Col>

                        <Col lg={13}>
                            <h4 className="title-text-item-content-fl">
                                <a href="#">{value.title}</a>
                            </h4>
                        </Col>
                    </Row>
                </li>
            );
        });
    }

    renderNewsTopHotFeature = () => {
        if (this.state.news.length !== 0) {
            return (
                <div>
                    <a href="#">
                        <img className="img-news-hot-top-fl"
                             src={this.state.news[5].img}
                        />
                    </a>
                    <h3 className="title-news-hot-top-fl">
                        <a href="#">{this.state.news[5].title}</a>
                    </h3>
                </div>
            )
        }
    }
    renderNewsTopRightHotFeature = () => {
        if (this.state.news.length !== 0) {
            return(
                <div>
                    <a href="#">
                        <img className="hehe"
                             src={this.state.news[6].img}
                             alt="#"/>
                    </a>
                    <h3 className="title-news-hot-top-fr">
                        <a href="#">
                            {this.state.news[6].title}
                        </a>
                    </h3>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <Container className="mt-2">
                    <Row>
                        <Col lg={16} className="featured-news">
                            <Row className="featured-news-top">

                                <Col lg={16} className="featured-news-hot-top-fl">
                                    {this.renderNewsTopHotFeature()}
                                </Col>

                                <Col lg={8} className="featured-news-hot-top-fr pl-lg-1 pr-lg-1">
                                    {this.renderNewsTopRightHotFeature()}
                                </Col>
                            </Row>

                            <Row className=" mt-2">
                                <ul className="list-group list-group-flush">
                                    {this.renderNewsLeftFeature()}
                                </ul>
                            </Row>
                        </Col>

                        <Col lg={8} className="featured-banner-hot-top-fr pr-lg-0">
                            <Row>
                                <ul className="list-group list-group-flush">
                                    {this.renderNewsRightFeature()}
                                </ul>
                            </Row>

                            <Row>
                                <Col lg={24} className="ml-lg-4 banner-right">
                                    <a href="#">
                                        <img className="img-fluid"
                                             src="https://res.cloudinary.com/aptech-fpt/image/upload/v1550772078/banner_hcm_02-min.png"
                                             alt=""/>
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ContentHompage;