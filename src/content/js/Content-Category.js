import React, {Component} from 'react';
import '../css/Content-homepage.css';
import '../css/Content-Category.css';
import "antd/dist/antd.css";
import axios from "axios";
import {Col, Row} from "antd";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";


class ContentCaegoty extends Component{
    constructor(props){
        super(props);
        this.state = {
            categorys :[],
            categoryId: undefined,
            api:"https://nalvnsmartnews.herokuapp.com/api/category/news/"
        }
    }

    getCategorys = () => {
        axios.get( `${this.state.api}${this.state.categoryId}`)
            .then((response) => {
                const getCategory = response.data.data.data;
                this.setState({
                    categorys:getCategory
                    })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getId = ()=>{
        this.setState({
            categoryId :  this.props.match.params.categoryId
        })
    }

    componentWillMount() {
        this.getId();
    }
    componentDidMount() {
        this.getCategorys()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.match.params.categoryId !== this.props.match.params.categoryId){
            this.setState({
                categoryId : nextProps.match.params.categoryId
            })
            this.forceUpdate(this.getCategorys)
        }
    }

    renderNewsLeftFeature = () => {
        return this.state.categorys.map((value) => {
            return (
                <li id="haha" key={value.id} className=" list-group-item">
                    <Row>
                        <Col lg={8} sm={8} xs={10} className="pr-lg-2  pr-sm-2 pr-xl-2">
                            <Link to={`/news-detail/${value.id}`}><img className="item-news" src={value.img}
                                             alt=""/></Link>
                        </Col>

                        <Col lg={16} sm={16} xs={14}>

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

    renderNewsTopHotFeature = () => {
        const hotNewCategory1 = this.state.categorys[this.state.categorys.length -4];

        if (this.state.categorys.length !== 0) {
            return(
                <div>
                    <Link to={`/news-detail/${hotNewCategory1.id}`}>
                        <img className="img-news-hot-top-fl"
                             src={hotNewCategory1.img}
                        />
                    </Link>
                    <h3 className="title-news-hot-top-fl">
                        <Link to={`/news-detail/${hotNewCategory1.id}`}>{hotNewCategory1.title}</Link>
                    </h3>
                </div>
            );
        }
    }

    renderNewsTopRightHotFeature = () => {
        const hotNewCategory2 = this.state.categorys[this.state.categorys.length -3];
        if (this.state.categorys.length !== 0) {
            return(
                <div>
                    <Link to={`/news-detail/${hotNewCategory2.id}`}>
                        <img className="hehe"
                             src={hotNewCategory2.img}
                             alt="#"/>
                    </Link>
                    <h3 className="title-news-hot-top-fr">
                        <Link to={`/news-detail/${hotNewCategory2.id}`}>
                            {hotNewCategory2.title}
                        </Link>
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
                                    {this.renderNewsLeftFeature()}
                                    {/*{this.hihi()}*/}
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