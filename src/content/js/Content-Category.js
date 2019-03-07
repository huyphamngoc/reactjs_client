import React, {Component} from 'react';
import '../css/Content-homepage.css';
import '../css/Content-Category.css';

import "antd/dist/antd.css";
import axios from "axios";
import {Col, Row, message} from "antd";
import {Container} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

class ContentCaegoty extends Component{
    constructor(props){
        super(props);
        this.state = {
            news :[],
            userId: undefined,
            api: '',
            hasMore: true,
            loading: false
        }
    }

    getNews = () => {
        let url = '';
        if(this.state.api === ''){
            url = `https://nalvnsmartnews.herokuapp.com/api/category/news/${this.state.userId}`;
        } else {
            url = this.state.api
        }

        if(!this.state.loading){
        
            // Set loading state to true to
            // avoid multiple requests on scroll
            this.setState({
                loading : true,
            });
        
            // make XHR request
            axios.get(url)
                .then((response) => {
                    const paginator = response.data.data,
                        news = paginator.data;
        
                    if(news.length){
                        // add new 
                        this.setState({
                            news : [...this.state.news , ...news],
                            api : paginator.next_page_url,
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

        // axios.get(`https://nalvnsmartnews.herokuapp.com/api/category/news/${this.state.userId}`)
        //     .then((response) => {
        //         const getCategory = response.data.data.data;
        //         this.setState({
        //                 news:getCategory
        //             })
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }


    getId = ()=>{
        console.log(this.props);
        const haha = this.props.match.params.userId;
        this.setState({
            userId : haha,
            api : '',
            news :[],
        })
    }

    componentWillMount() {
        this.getId();
    }
    componentDidMount() {
        this.getNews()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.match.params.userId !== this.props.match.params.userId){
            const currentProductId = nextProps.match.params.userId;
            this.setState({
                userId : currentProductId,
                news: [],
                api: '',
                hasMore: true,
            })
            this.forceUpdate(this.getNews)
        }
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

    renderNewsTopHotFeature = () => {
        if (this.state.news.length !== 0) {
            return(
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
            );
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
        return(
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
                                <Col lg={24} className="ml-lg-4 banner-right">
                                    <a href="#">
                                        <img className="img-fluid"
                                             src="https://res.cloudinary.com/aptech-fpt/image/upload/v1551411295/quy11-adx5c18af1f522e8.jpg"
                                             alt=""/>
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={24} className="ml-lg-4 banner-right">
                                    <a href="#">
                                        <iframe style={{height:258}} className="img-fluid"
                                                src="https://adi.admicro.vn/adt/banners/nam2015/4043/min_html5/dungvuanh/2019_01_28/300X250(1)/300X250/300X250.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttp%253A%252F%252Fkenh14.vn%252Fstar.chn%26lsn%3D1551407726100%26ce%3D1%26lc%3D4%26cr%3D1545484963%26ui%3D5245484963250132679%26bi%3D0%26cmpg%3D36349%26items%3D132787%26zid%3D27032%26pr%3D13307224913%26cid%3D-1%26tp%3D12%26tpn%3D4%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fadsgame.soha.vn%252Fservice%252Fservice%252Ftrack%253Futm_campaign%253DLDBN_ADXPC%2526utm_source%253DLDBN_ADXPC%2526redirected%253Dhttps%25253A%25252F%25252Flongdobanghiep.vn%25252Ftop1&admid=adnzone_27032_0_132787"
                                                alt=""/>
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={24} className="ml-lg-4 banner-right">
                                    <a href="#">
                                        <iframe style={{height:604}} className="img-fluid"
                                                src="https://res.cloudinary.com/aptech-fpt/image/upload/v1551495198/banner-vietpro-tet.gif"
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
export default ContentCaegoty;