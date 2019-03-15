import React, { Component } from 'react';
import '../css/Layout-footer.css';
import "antd/dist/antd.css";
import {Row,Col } from 'antd';
import {Container, } from 'react-bootstrap';
import axios from "axios";
import {Link} from "react-router-dom";

class LayoutFooter extends Component{
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

    getCategory = ()=>{
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
        this.getCategory();
    }

    renderCategoryPC =()=> {
        return this.state.category.map((value) => {
            return (
                <li className="nav-item item-list-menu-category-footer-pc pl-lg-0 pr-lg-0 pl-1 pr-1 ">
                    <Link className=" nav-link" key={value.category_url} to={`/category/${value.category_url}`}>{value.name}</Link>
                </li>
            );
        });
    }


    render() {
        return(
            <div id="footer-layout" className="mt-2">
                <div className="footer-layout-top mb-lg-2">
                    <Container>
                        <Row>
                            <div className="ml-lg-5 mr-lg-5">
                                <ul className="nav list-menu-category-footer-pc">
                                    {this.renderCategoryPC()}
                                </ul>
                            </div>
                        </Row>
                    </Container>
                </div>

                <div className="footer-layout-bottom">
                    <Container>
                        <div className="footer-content">
                            <Row>
                                <Col lg={8} xs={24} id="footer-content-left">
                                    <div  className=" footer-content-left">
                                        <div className="title-footer-content-center">
                                            <h3 className="text-uppercase font-weight-bolder font-weight">TRỤ SỞ HÀ NỘI</h3>
                                            <div>
                                                <span className="text-item-footer-bottom">
                                                   Tầng 20, tòa nhà Center Building, Hapulico Complex, số 1 Nguyễn Huy Tưởng, p. Thanh Xuân Trung, quận Thanh Xuân, Hà Nội. Điện thoại: 024.39743410, máy lẻ 230.
                                                </span>
                                            </div>
                                        </div>

                                        <div className="title-footer-content-center mt-lg-4">
                                            <h3 className="text-uppercase">TRỤ SỞ TP.HỒ CHÍ MINH</h3>
                                            <div>
                                                <span className="text-item-footer-bottom">
                                                   Tầng 20, tòa nhà Center Building, Hapulico Complex, số 1 Nguyễn Huy Tưởng, p. Thanh Xuân Trung, quận Thanh Xuân, Hà Nội. Điện thoại: 024.39743410, máy lẻ 230.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={8} xs={24} >
                                    <div className=" footer-content-center ">
                                        <div className="ml-lg-2 title-footer-content-center">
                                            <h3 className="text-uppercase">Chịu trách nhiệm quản lý nội dung</h3>
                                            <div>
                                                <span className="text-item-footer-bottom">
                                                    Mr.Bin
                                                </span>
                                            </div>
                                        </div>

                                        <div className="ml-lg-2 title-footer-content-center mt-lg-2">
                                            <h3 className="text-uppercase">ý kiến bài viết</h3>
                                            <div className="row">
                                                <div className="col-6 col-lg-12">
                                                    <Link to={`#`} className="text-decoration-none">
                                                        <p className="mb-lg-0 text-item-footer-bottom"><i
                                                            className="hihi text-danger fas fa-envelope"/> huypn@gmail.com
                                                        </p>
                                                    </Link>
                                                </div>
                                                <div className="col-6 col-lg-12">
                                                    <Link to={`#`} className="text-decoration-none" >
                                                        <p className="mb-lg-0 text-lg-left text-right text-item-footer-bottom">
                                                            <i
                                                                className="text-danger fas fa-question-circle"/> Câu hỏi
                                                            thường gặp</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ml-lg-2 title-footer-content-center mt-lg-2">
                                            <h3 className="text-uppercase">Hợp tác nội dung</h3>
                                            <div className="row">
                                                <div className="col-6 col-lg-12">
                                                    <Link to={`#`} className="text-decoration-none" >
                                                        <p className="mb-lg-0 text-item-footer-bottom "><i
                                                            className="text-danger fas fa-envelope"/> marketing@nal.com
                                                        </p>
                                                    </Link>
                                                </div>
                                                <div className="col-6 col-lg-12">
                                                    <Link to={`#`} className="text-decoration-none" >
                                                        <p className="mb-lg-0 text-lg-left text-right text-item-footer-bottom">
                                                            <i
                                                                className="text-danger fas fa-phone-square"/> 0912 345
                                                            678</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ml-lg-2 title-footer-content-center mt-lg-2">
                                            <h3 className="text-uppercase">Hỗ trợ quảng cáo</h3>
                                            <div className="row">
                                                <div className="col-12 ">
                                                    <Link to={`#`} className="text-decoration-none" >
                                                        <p className="mb-lg-0 text-item-footer-bottom"><i
                                                            className="text-danger fas fa-envelope"/> marketing@nal.com
                                                        </p>
                                                    </Link>
                                                </div>
                                                <div className="col-12">
                                                    <Link to={`#`} className="text-decoration-none">
                                                        <p className="mb-lg-0 text-item-footer-bottom"><i
                                                            className="text-danger fas fa-phone-square"/> 0912 345 678
                                                        </p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={8} xs={24} id="footer-content-right">
                                    <div className="">
                                        <p className="text-right text-title-footer-content-right">
                                            Giấy phép số 1818/GP-TTĐT do Sở Thông tin và Truyền thông Hà Nội cấp ngày
                                            05/05/2017
                                            Đơn vị chủ quản: Công ty Cổ phần Công nghệ EPI * Chịu trách nhiệm: Nguyễn
                                            Thanh Tùng
                                            Địa chỉ: Tầng 5, Tòa nhà Báo Sinh Viên VN, D29 Phạm Văn Bạch, Yên Hòa, Cầu
                                            Giấy, Hà Nội
                                        </p>
                                        <p className="text-right text-title-footer-content-right">
                                            Tel: (024) 3-212-3232 ext. 2947. contact.baomoi@epi.com.vn
                                        </p>
                                        <p className="text-right text-title-footer-content-right">
                                            BÁO MỚI tổng hợp và sắp xếp các thông tin tự động
                                            bởi chương trình máy tính
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}
export default LayoutFooter;