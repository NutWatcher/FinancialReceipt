import React, {Component} from 'react';
import styles from './BillFormUpdate.less';
import {Modal, Button} from 'antd';
import {Form, Input, Switch, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, AutoComplete, Radio} from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
};
const formItemTwoLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
};
class SelectTagInput extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            opValue:this.props.value || "",
            Svalue:this.props.value || ""
        }
    }
    componentWillReceiveProps(next){
        if (next.value != this.state.opValue){
           // next.searchCompanyHandler(next.value);
            this.setState({opValue:next.value,Svalue:next.value});
        }
    }
    handleSelectChange = (value) => {
        //this.props.onChange(value);
        //this.setState({ Svalue: value });
        this.props.searchCompanyHandler(value);
        this.props.onChange(value);
        //this.setState({opValue:value,Svalue:value});
    };
    handleSelect = (value) => {
        console.log("handleSelect");
        console.log(value);
        this.props.onChange(value);
        //this.setState({ Svalue: value });
        //this.props.searchCompanyHandler(value);
    };
    render() {
        return (
            <span>
        <Select
            mode="combobox"
            value={this.state.Svalue}
            style={{ width: '100%' }}
            onChange={this.handleSelectChange}
            onSelect={this.handleSelect}
        >
          <Option key={0} value={this.state.opValue}>{this.state.opValue}</Option>
            {
                this.props.options.map((value , index) => {
                    return  <Option key={index+1} value={value.name}>{value.name}</Option>
                })
            }
        </Select>
      </span>
        );
    }
}
class SelectInput extends React.Component {
    constructor(props) {
        super(props);
    }
    handleSelect = (value) => {
        console.log("handleSelect");
        console.log(value);
        this.props.onChange(value);
        //this.setState({ Svalue: value });
        //this.props.searchCompanyHandler(value);
    };
    render() {
        return (
            <Select
                onSelect={this.handleSelect}
                value = {this.props.value}
                style={{ width: '100%'}}
            >
                {
                    this.props.options.map((value , index) => {
                        return  <Option key={index} value={value.id}>{value.name}</Option>
                    })
                }
            </Select>
        );
    }
}
class CollectionForm extends Component{
    constructor(props){
        super(props);
        this.state = {};
    };
    render() {
        const { visible, onCancel, onUpdate, form, formList, companyList, searchCompanyHandler, initData } = this.props;
        console.log(initData);
        const { getFieldDecorator } = form;

        return (
            <Modal width={900} visible={visible} style={{ top: 20 }}
                   title="新增台账" okText="新增"
                   onCancel={onCancel} onOk={onUpdate}
            >
                <Form layout="horizontal">
                    <Row gutter={8}>
                        <Col span={10} >
                            <FormItem  label="公司名称" {...formItemTwoLayout}>
                                {getFieldDecorator('company', {
                                    initialValue: initData.companyName,
                                    rules: [{ required: true, message: '请输入..' }],
                                })(
                                    <SelectTagInput  options={companyList} searchCompanyHandler={searchCompanyHandler}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={10} >
                            <FormItem label="部门11" {...formItemTwoLayout}>
                                {getFieldDecorator('department', {
                                    initialValue: initData.departmentId,
                                    rules: [{ required: true, message: '请输入..' }],
                                })(<SelectInput options={formList.departmentsList}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={10} >
                            <FormItem label="事项" {...formItemTwoLayout}>
                                {getFieldDecorator('matter', {
                                    initialValue: initData.matter,
                                    rules: [{ required: true, message: '请输入..' }],
                                })(<Input  />)}
                            </FormItem>
                        </Col>
                        <Col span={10} >
                            <FormItem label="专业" {...formItemTwoLayout}>
                                {getFieldDecorator('profession', {
                                    initialValue: initData.professionId,
                                    rules: [{ required: true, message: '请输入..' }],
                                })(<SelectInput options={formList.professionsList}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={10} >
                            <FormItem label="发票代码" {...formItemTwoLayout}>
                                {getFieldDecorator('billCode', {
                                    initialValue: initData.billCode,
                                    rules: [{ required: true, message: '请输入..' }],
                                })(<Input  />)}
                            </FormItem></Col>
                        <Col span={10} >
                            <FormItem label="发票号码" {...formItemTwoLayout}>
                                {getFieldDecorator('billNumber', {
                                    initialValue: initData.billNumber,
                                    rules: [{ required: true, message: '请输入..' }],
                                })(<Input  />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem  label="备注" {...{...formItemLayout}} >
                        {getFieldDecorator('remark', {
                            initialValue: initData.remark,
                        })(
                            <TextArea />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const CollectionCreateForm = Form.create()(CollectionForm);
class BillFormUpdate extends Component {
    state = {
        visible: false,
    };
    handleUpdate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of updateForm: ', values);
            values["id"] = this.props.billData.id;
            form.resetFields();
            this.props.updateHandler(values);
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };

    render() {
        //console.log("propsformlist");
        //console.log(this.props.formList);
        return (
            <div>
                <CollectionCreateForm
                    initData={this.props.billData}
                    companyList={this.props.companyList}
                    searchCompanyHandler={this.props.searchCompanyHandler}
                    formList={this.props.formList}
                    ref={this.saveFormRef}
                    visible={this.props.visible}
                    onCancel={this.props.handleCancel}
                    onUpdate={this.handleUpdate}
                />
            </div>
        );
    }
}

export default BillFormUpdate;
