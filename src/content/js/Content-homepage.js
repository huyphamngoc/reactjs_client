import React, {Component} from 'react';
import '../css/Content-homepage.css';
import "antd/dist/antd.css";
import {Row, Col} from 'antd';
import {Container,} from 'react-bootstrap';
import axios from "axios";
import {Link} from "react-router-dom";


class ContentHompage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            api: "https://nalvnsmartnews.herokuapp.com/api/news"
        };
    }

    getNews = () => {
        axios.get(this.state.api)
            .then((response) => {
                const getNews = response.data.data.data;
                this.setState({
                    news: getNews
                })
                 const hihi = getNews[getNews.length -5];
                console.log(getNews)
                console.log(hihi)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getNews();
    }

    renderNewsLeftFeature = () => {
        return this.state.news.map((value) => {
            return (
                <li id="haha" key={value.id} className="list-group-item">
                    <Row>
                        <Col lg={8} sm={8} xs={10} className="pr-lg-2  pr-sm-2 pr-xl-2">
                            <Link to={`/news-detail/${value.id}`} ><img className="huy123" src={value.img}
                                             alt=""/></Link>
                        </Col>

                        <Col lg={16} sm={16}>
                            <h4 className="title-text-item-content-fl">
                                <Link to={`/news-detail/${value.id}`}>{value.title}</Link>
                            </h4>

                            <div className="text-item-content-fl">
                                <div className="categoty-item-content-fl mb-lg-1">
                                    <Link to={`/news-detail/${value.id}`}>{value.category_name}</Link>
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
        return this.state.news.map((value) => {
            return (
                <li key={value.id} className="list-group-item">
                    <Row>
                        <Col lg={9} className=" pr-lg-1">
                            <Link to={`/news-detail/${value.id}`}><img className="img-fluid"
                                src={value.img}
                                alt=""/>
                            </Link>
                        </Col>

                        <Col lg={13}>
                            <h4 className="title-text-item-content-fl">
                                <Link to={`/news-detail/${value.id}`}>{value.title}</Link>
                            </h4>
                        </Col>
                    </Row>
                </li>
            );
        });
    }

    renderNewsTopHotFeature = () => {
            const hotNewHomepagel = this.state.news[this.state.news.length -1];
        if (this.state.news.length !== 0) {
            return (
                <div>
                    <Link to={`/news-detail/${hotNewHomepagel.id}`}>
                        <img className="img-news-hot-top-fl"
                             src={hotNewHomepagel.img}
                        />
                    </Link>
                    <h3 className="title-news-hot-top-fl">
                        <Link to={`/news-detail/${hotNewHomepagel.id}`}>{hotNewHomepagel.title}</Link>
                    </h3>
                </div>
            )
        }
    }
    renderNewsTopRightHotFeature = () => {
        const hotNewHomepage2 = this.state.news[this.state.news.length -2];
        if (this.state.news.length !== 0) {
            return(
                <div>
                    <Link to={`/news-detail/${hotNewHomepage2.id}`}>
                        <img className="hehe"
                             src={hotNewHomepage2.img}
                             alt="#"/>
                    </Link>
                    <h3 className="title-news-hot-top-fr">
                        <Link to={`/news-detail/${hotNewHomepage2.id}`}>
                            {hotNewHomepage2.title}
                        </Link>
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