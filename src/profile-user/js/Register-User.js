import React, {Component} from 'react';
import '../css/Register-User.css';
import "antd/dist/antd.css";
import { Row, message, Col,Modal} from 'antd';
import {Container,} from 'react-bootstrap';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {Link} from "react-router-dom";
import ContentHompage from "../../content/js/Content-homepage";

class RegisterUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            news: [],
            api: "https://nalvnsmartnews.herokuapp.com/api/news",
            hasMore: true,
            loading: false,
            visible: true,
            haha : true,
        };
    }

    getNews = () => {

        if (!this.state.loading) {

            // Set loading state to true to
            // avoid multiple requests on scroll
            this.setState({
                loading: true,
            });

            // make XHR request
            axios.get(this.state.api)
                .then((response) => {

                    const paginator = response.data.data,
                        news = paginator.data;

                    if (news.length) {
                        // add new
                        this.setState({
                            news: [...this.state.news, ...news],
                            api: paginator.next_page_url,
                            loading: false,
                        });
                    }

                    // remove scroll event if next_page_url is null
                    if (!paginator.next_page_url) {
                        message.warning('Infinite List loaded all');
                        this.setState({
                            hasMore: false,
                            loading: false,
                        });
                        return;
                    }
                });
        }
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
                            <Link to={`/news-detail/${value.url}`}><img className="item-news" src={value.img}
                                                                        alt=""/></Link>
                        </Col>

                        <Col lg={16} sm={16} xs={14}>
                            <h4 className="title-text-item-content-fl">
                                <Link to={`/news-detail/${value.url}`}>{value.title}</Link>
                            </h4>

                            <div className="text-item-content-fl">
                                <div className="categoty-item-content-fl mb-lg-1">
                                    <Link to={`/news-detail/${value.url}`}>{value.category_name}</Link>
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

    renderNewsRightFeature = () => {
        return this.state.news.map((value) => {
            return (
                <li key={value.id} className="list-group-item">
                    <Row>
                        <Col lg={9} className=" pr-lg-1">
                            <Link to={`/news-detail/${value.url}`}><img className="img-fluid"
                                                                        src={value.img}
                                                                        alt=""/>
                            </Link>
                        </Col>

                        <Col lg={13}>
                            <h4 className="title-text-item-content-fl">
                                <Link to={`/news-detail/${value.url}`}>{value.title}</Link>
                            </h4>
                        </Col>
                    </Row>
                </li>
            );
        });
    }

    renderNewsTopHotFeature = () => {
        const hotNewHomepagel = this.state.news[this.state.news.length - 1];
        if (this.state.news.length !== 0) {
            return (
                <div>
                    <Link to={`/news-detail/${hotNewHomepagel.url}`}>
                        <img className="img-news-hot-top-fl"
                             src={hotNewHomepagel.img} alt=""/>
                    </Link>
                    <h3 className="title-news-hot-top-fl">
                        <Link to={`/news-detail/${hotNewHomepagel.url}`}>{hotNewHomepagel.title}</Link>
                    </h3>
                </div>
            )
        }
    }

    renderNewsTopRightHotFeature = () => {
        const hotNewHomepage2 = this.state.news[this.state.news.length - 2];
        if (this.state.news.length !== 0) {
            return (
                <div>
                    <Link to={`/news-detail/${hotNewHomepage2.url}`}>
                        <img className="hehe"
                             src={hotNewHomepage2.img}
                             alt="#"/>
                    </Link>
                    <h3 className="title-news-hot-top-fr">
                        <Link to={`/news-detail/${hotNewHomepage2.url}`}>
                            {hotNewHomepage2.title}
                        </Link>
                    </h3>
                </div>
            );
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState.visible !== this.state.visible){
            return <ContentHompage />;
        }
    }

    handleOk = ()=>{
        this.setState({
                visible: false,
            });
    }

    render() {

        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                      onOk={this.handleOk()}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

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
                                    <InfiniteScroll
                                        dataLength={this.state.news.length}
                                        next={this.getNews}
                                        hasMore={this.state.hasMore}
                                        loader={<div className="loader" key={0}>Loading ...</div>}
                                    >
                                        {this.renderNewsLeftFeature()}
                                    </InfiniteScroll>
                                </ul>
                            </Row>
                        </Col>

                        <Col lg={8} className="featured-banner-hot-top-fr pr-lg-0">
                            <Row>
                                <ul className="list-group list-group-flush">
                                    {this.renderNewsRightFeature()}
                                </ul>
                            </Row>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default RegisterUser;