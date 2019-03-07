import React, {Component} from 'react';
import "antd/dist/antd.css";
import "../css/Content-Detail.css"
import axios from "axios";
import {Col, Row} from "antd";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import html from 'react-inner-html';

class ContentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            newsId: undefined,
            api: "https://nalvnsmartnews.herokuapp.com/api/news/",
            categorys: [],
            categoryId: undefined,
            apiCategory: "https://nalvnsmartnews.herokuapp.com/api/category/news/",
        }
    }

    getId = () => {
        this.setState({
            newsId: this.props.match.params.newsId
        })
    }

    getNews = () => {
        axios.get(`${this.state.api}${this.state.newsId}`)
            .then((response) => {
                const getNews = response.data.data;
                const getCategorys = response.data.data.category_id;
                this.setState({
                    news: getNews,
                    categoryId: getCategorys
                }, this.getCategorys,
                    this.topFunction(),
                    )
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getCategorys = () => {
        axios.get(`${this.state.apiCategory}${this.state.categoryId}`)
            .then((response) => {
                const getCategory = response.data.data.data;
                this.setState({
                    categorys: getCategory,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentWillMount() {
        this.getId()
    }

    componentDidMount() {
        this.getNews()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.match.params.newsId !== this.props.match.params.newsId){
            this.setState({
                newsId : nextProps.match.params.newsId
            })
            this.forceUpdate(this.getNews)

        } else {
            console.log("not update")
        }
    }

    renderDetailNews = () => {
        if (this.state.news !== null) {
            return (
                <div>
                    <div className="title-content-detail ">
                        <div>
                            <h3 className="text-title-content-detail font-weight-bold">
                                {this.state.news.title}
                            </h3>
                        </div>
                    </div>
                    <div className="img-news-detail pb-2">
                        <img className="img-fluid" src={this.state.news.img} alt=""/>
                    </div>

                    <div className="description-news-detail pt-2 pb-2">
                        <span className="font-weight-bold">
                            {this.state.news.description}
                        </span>
                    </div>

                    <div className="content-news-detail pt-2 pb-2">
                        <div {...html(this.state.news.content)} />
                    </div>
                </div>
            )
        }
    }

    renderCategoryNews = () => {
        const abc = this.state.categorys.slice(0, 6)
        return abc.map((value) => {
            return (
                <li className="list-group-item">
                    <Row>
                        <Col lg={8} sm={8} xs={10} className="pr-lg-2  pr-sm-2 pr-xl-2">
                            <Link to={`/news-detail/${value.id}`}><img className="huy123"
                                             src={value.img}
                                             alt=""/></Link>
                        </Col>
                        <Col lg={16} sm={16}>
                            <h4 className="title-text-item-content-fl">
                                <Link to={`/news-detail/${value.id}`}>{value.title}</Link>
                            </h4>

                            <div className="text-item-content-fl">
                                {/*<div className="categoty-item-content-fl mb-lg-1">*/}
                                    {/*<Link to={`//category/${value.id}`}>{value.id}</Link>*/}
                                {/*</div>*/}
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

    topFunction=()=> {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    render() {
        return (
            <div>
                <Container id="detail-content" className="news-detail-wrapper mt-2">
                    <div className="news-detail-container">
                        <Row>
                            <Col lg={16}>
                                <Row>
                                    <Col>
                                        {this.renderDetailNews()}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="news-of-category">
                                            <div>
                                                <h5 className="category-of-detail text-uppercase font-weight-bold">Tin
                                                    cùng chuyên mục</h5>
                                            </div>
                                            <div>
                                                <Row className=" mt-2">
                                                    <ul className="list-group list-group-flush">
                                                        {this.renderCategoryNews()}
                                                    </ul>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }

}

export default ContentDetail;