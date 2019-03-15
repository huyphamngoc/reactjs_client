import React from "react";
import "antd/dist/antd.css";
import axios from 'axios';
import {Form, Input, Select, Button, notification} from "antd";


import FroalaEditor from 'react-froala-wysiwyg';

const Option = Select.Option;

const openNotificationWithIcon = (type, notifi) => {
    if (type === 'warning') {
        notification[type]({
            message: 'Warning',
            description: 'Please wait for the news to be moderated.',
        });
    }
    if (type === 'success') {

        notification[type]({
            message: 'Success',
            description: 'Your news has been posted.',
        });
        setTimeout(() => {
            openNotificationWithIcon("warning");
        }, 3000);

    }
    if (type === 'error') {
        notification[type]({
            message: 'Error',
            description: [notifi],
        });
    }
};

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 16}
};
const formTailLayout = {
    labelCol: {span: 16},
    wrapperCol: {span: 4, offset: 12}
};

class DynamicRule extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryOptions: [],
            model: '',
            title: '',
            category: '',
            description: '',
            source: '',
            author: '',
            img: '',
            user_id: '',
            loading: false,
            iconLoading: false,
            checktitle: false,
            user: undefined
        };

        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
    }

    enterLoading = () => {
        this.setState({loading: true});
    }

    componentWillMount() {
        const haha = JSON.parse(sessionStorage.getItem('userData'));
        this.setState({
            user:haha.id
        })
        this.getCategory();
    }

    handleUploadFile(e) {

        var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqbat91l8/upload';
        var CLOUDINARY_UPLOAD_PRESET = 'b3uy9rh5';
        var file = e.target.files[0];
        var formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        axios({
            url: CLOUDINARY_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
        }).then(function (res) {
            document.getElementById('sowImage').src = res.data.url;
        }).catch(function (err) {
            console.log(err);
        });

    }

    handleFormSubmit() {
        var _this = this;
        let form = document.getElementById("formNews");

        var productData = {
            "title": form['title'].value,
            "description": form['description'].value,
            "content": this.state.model,
            "source": form['source'].value,
            "author": form['author'].value,
            "category_id": this.state.category,
            "user_id": this.state.user,
            "img": form['sowImage'].src
        };
        var req = new XMLHttpRequest();
        req.open("POST", "https://nalvnsmartnews.herokuapp.com/api/news");
        req.setRequestHeader("Content-Type", "application/json");
        req.onload = function () {
            var res = JSON.parse(this.responseText);
            if (req.status === 200 || req.status === 201) {
                openNotificationWithIcon('success', this.responseText);
            } else {
                console.log(res);
                openNotificationWithIcon('error', this.responseText);
                _this.setState({loading: false})
            }
        };
        req.send(JSON.stringify(productData));
    }

    getCategory() {
        var req = new XMLHttpRequest();
        var _this = this;
        req.open("GET", "https://nalvnsmartnews.herokuapp.com/api/category");
        req.setRequestHeader("Content-Type", "application/json");
        req.onload = function () {
            if (req.status === 200 || req.status === 201) {
                _this.setState({
                    categoryOptions: (JSON.parse(this.responseText)).data,
                });
            } else {
                console.log(JSON.parse(this.responseText));
            }
        };
        req.send();
    }


    handleClearForm(e) {
        e.preventDefault();
        this.setState({});
    }

    check = () => {
        this.props.form.validateFields(err => {
            if (!err) {
                this.handleFormSubmit()
                this.enterLoading()

            }
        });
    };

    handleModelChange = model => {
        this.setState({
            model: model
        });

    }

    handleSelectChange = (value) => {
        this.setState({
            category: value
        });

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form className="login-form" id="formNews">
                    <Form.Item {...formItemLayout} label="Title">
                        {getFieldDecorator("title", {
                            rules: [
                                {
                                    required: true,
                                    message: "The title should not be empty"
                                }
                            ]
                        })(<Input name="title" placeholder="Please input your title"/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="Description">
                        {getFieldDecorator("description", {
                            rules: [
                                {
                                    required: true,
                                    message: "The description should not be empty "
                                }
                            ]
                        })(<Input name={"description"} placeholder="Please input your description"/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="Category">
                        {getFieldDecorator("category", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please select a category "
                                }
                            ]
                        })(<Select
                            id={"category"}
                            style={{width: 200}}
                            placeholder="Select a category"
                            onChange={this.handleSelectChange}
                        >
                            {this.state.categoryOptions.map((value, i) => <Option key={i}
                                                                                  value={value.id}>{value.name}</Option>)}

                        </Select>)}
                    </Form.Item>


                    <Form.Item {...formItemLayout} label="Image">
                        {getFieldDecorator("image", {
                            rules: [
                                {
                                    required: true,
                                    message: "The image should not be empty "
                                }
                            ]
                        })(<input
                                type='file'
                                id='uploadImg'
                                onChange={e => {
                                    this.handleUploadFile(e)
                                }}
                            />
                        )}
                        <img alt="img-error"
                            hidden={false}
                            id='sowImage'
                            style={{width: 180, height: 180}}
                        />
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="Content">
                        {getFieldDecorator("content", {
                            rules: [
                                {
                                    required: false,
                                    message: "The content should not be empty "
                                }
                            ]
                        })(<FroalaEditor
                            tag='textarea'
                            config={{
                                placeholderText: 'Enter Your Content Here!',
                                charCounterCount: false,
                                height: 200,
                                imageUploadURL: 'https://api.cloudinary.com/v1_1/dqbat91l8/upload',
                                imageUploadParams: {
                                    'upload_preset': 'b3uy9rh5'
                                },
                                imageUploadMethod: 'POST',
                                events: {
                                    'froalaEditor.image.uploaded': (e, editor, response) => {
                                        response = JSON.parse(response);
                                        editor.image.insert(response.secure_url, true, null, editor.image.get(), null)
                                        return false
                                    }
                                }
                            }}

                            model={this.state.model}
                            onModelChange={this.handleModelChange}
                        />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="Source">
                        {getFieldDecorator("source", {
                            rules: [
                                {
                                    required: true,
                                    message: "The source should not be empty "
                                }
                            ]
                        })(<Input name={"source"} placeholder="Please input source"/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="Author">
                        {getFieldDecorator("author", {
                            rules: [
                                {
                                    required: true,
                                    message: "The author should not be empty "
                                }
                            ]
                        })(<Input name={"author"} placeholder="Please input author"/>)}
                    </Form.Item>

                    <Form.Item {...formTailLayout}>
                        <Button block type="primary" htmlType="submit" onClick={this.check}
                                loading={this.state.loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}


const CreateForm = Form.create({name: "dynamic_rule"})(DynamicRule);
export default CreateForm;
