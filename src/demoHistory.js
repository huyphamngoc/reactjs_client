import React, {Component} from 'react';
import "antd/dist/antd.css";
import Container from "react-bootstrap/es/Container";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";


class demoHistory extends Component{
    constructor(props){
        super(props);
        this.state = {
            news: [],
            newsId: undefined,
            api: "https://smartnews.nal.vn/api/news/",
            categorys: [],
            categoryId: undefined,
            apiCategory: "https://smartnews.nal.vn/api/category/news/",
        }
    }

    getId = () => {
        console.log(this.props.match.params.demoId);
        // this.setState({
        //     newsId: this.props.match.params.demoId
        // })
    }

    getNews = () => {
        // axios.get(`${this.state.api}${this.state.newsId}`)
        //     .then((response) => {
        //         const getNews = response.data.data;
        //         const getCategorys = response.data.data.category_id;
        //         this.setState({
        //                 news: getNews,
        //                 categoryId: getCategorys
        //             }, this.getCategorys,
        //         )
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }

    componentWillMount() {
        this.getId()
    }

    componentDidMount() {
        this.getNews()
    }

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h3>hihi</h3>
                            <h3>hihi</h3>
                            <h3>hihi</h3>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default demoHistory;