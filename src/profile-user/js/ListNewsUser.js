import React from 'react';
import 'antd/dist/antd.css';
import {List, Icon, notification, Button, Modal} from 'antd';
import Link from "react-router-dom/es/Link";

const confirm = Modal.confirm;

const API_URL = "https://nalvnsmartnews.herokuapp.com";

const USER = JSON.parse(sessionStorage.getItem('userData'));

const openNotificationWithIcon = (type, notifi) => {
    notification[type]({
        message: [type],
        description: [notifi],
    });
};

const IconText = ({type, text}) => (
    <span>
        <Icon type={type} style={{marginRight: 8}}/>
        {text}
    </span>
);

class ListNewsUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            loading: false,
        };
    }

    howDeleteConfirm = (item) => {
        var _this = this;
        confirm({
            title: 'Are you sure delete this news ?',
            content: [item.title],
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                _this.enterLoading();
                var req = new XMLHttpRequest();
                var dataListNews;
                req.open("DELETE", API_URL + "/api/news/" + [item.id]);
                req.setRequestHeader("Content-Type", "application/json");
                req.onload = function () {
                    if (req.status === 200 || req.status === 201) {
                        dataListNews = (JSON.parse(this.responseText));
                        openNotificationWithIcon('success', "Deleted" + [item.title]);
                        setTimeout(() => {
                            openNotificationWithIcon('warning', "The page will automatically reload !!!");
                        }, 1000);
                    } else {
                        console.log(JSON.parse(this.responseText));
                    }
                };
                req.send();
                _this.getListNews();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    componentDidMount() {
        this.getListNews();

    }

    enterLoading = () => {
        this.setState({loading: true});
    }

    getListNews() {
        var req = new XMLHttpRequest();
        var dataListNews;
        var _this = this;

        req.open("GET", API_URL + "/api/news/user/"+ USER.id);
        req.setRequestHeader("Content-Type", "application/json");
        req.onload = function () {
            if (req.status === 200 || req.status === 201) {
                dataListNews = (JSON.parse(this.responseText)).data;

                _this.setState({
                    listData: dataListNews,
                    loading: false,
                })
            } else {
                console.log(JSON.parse(this.responseText));
            }
        };
        req.send();
    }

    render() {
        return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {

                        },
                        pageSize: 5,
                    }}
                    dataSource={this.state.listData}

                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[<IconText type="clock-circle" text={item.updated_at}/>,
                                <Button><Icon type="form"/>
                                </Button>,
                                <Button loading={this.state.loading} onClick={() => this.howDeleteConfirm(item)}
                                        type="danger"><Icon type="delete"/></Button>]}
                            extra={<img width={272} height={163} alt="logo" src={item.img}/>}>

                            <List.Item.Meta
                                title={ <a href={`news-detail/${item.url}`}> {item.title} </a> }

                                description={item.category_name}
                            />

                            {item.description}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default ListNewsUser;
