import React, { Component } from 'react';
import styles from './BillForm.less';
import { Modal, Button } from 'antd';
import { Form, Input, Switch, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, AutoComplete, Radio  } from 'antd';
import company from "../../models/company";
const FormItem = Form.Item;
const { TextArea } = Input;
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
      Svalue:this.props.value
    }
  }
  handleSelectChange = (value) => {
    //this.props.onChange(value);
    //this.setState({ Svalue: value });
    this.props.searchCompanyHandler(value);
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
          {
            this.props.options.map((value , index) => {
              return  <Option key={index} value={value.name}>{value.name}</Option>
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
  handleSelectChange = (value) => {
    this.props.onChange(value);
  };
  render() {
    return (
      <span>
        <Select
          value={this.props.value}
          style={{ width: '100%' }}
          onChange={this.handleSelectChange}
        >
          {
            this.props.options.map((value , index) => {
              return  <Option key={index} value={value.id}>{value.name}</Option>
            })
          }
        </Select>
      </span>
    );
  }
}
class CollectionForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      RaxDistribution: "",
      showOutMoney: false,
      showDeductible: false
    };
  }
  changeRaxDistribution = (e) => {
    console.log('radio checked', e.target.value);
    let v = e.target.value ;
    let param = {
      RaxDistribution: v,
      showOutMoney: false,
      showDeductible: false
    };
    if (v == "a"){
      param.showOutMoney = true ;
    }
    else if (v == "b"){
      param.showDeductible = true ;
    }
    else {
      param.showDeductible = true ;
      param.showOutMoney = true ;
    }
    this.setState(param);
  };
  render() {
    const { visible, onCancel, onCreate, form, formList, companyList, searchCompanyHandler } = this.props;
    const { getFieldDecorator } = form;
    console.log("companyList");
    console.log(companyList);
    return (
      <Modal width={900} visible={visible} style={{ top: 20 }}
        title="新增台账" okText="新增"
        onCancel={onCancel} onOk={onCreate}
      >
        <Form layout="horizontal">
          <Row gutter={8}>
            <Col span={10} >
              <FormItem  label="公司名称" {...formItemTwoLayout}>
                {getFieldDecorator('company', {
                  initialValue: null,
                  rules: [{ required: true, message: '请输入..' }],
                })(
                  <SelectTagInput options={companyList} searchCompanyHandler={searchCompanyHandler}/>
                )}
              </FormItem>
            </Col>
            <Col span={10} >
              <FormItem label="部门" {...formItemTwoLayout}>
                {getFieldDecorator('department', {
                  initialValue: null,
                  rules: [{ required: true, message: '请输入..' }],
                })(<SelectInput options={formList.departmentsList}/>)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={10} >
              <FormItem label="事项" {...formItemTwoLayout}>
                {getFieldDecorator('matter', {
                  rules: [{ required: true, message: '请输入..' }],
                })(<Input  />)}
              </FormItem>
            </Col>
            <Col span={10} >
              <FormItem label="专业" {...formItemTwoLayout}>
                {getFieldDecorator('profession', {
                  rules: [{ required: true, message: '请输入..' }],
                })(<SelectInput options={formList.professionsList}/>)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={10} >
              <FormItem label="发票代码" {...formItemTwoLayout}>
                {getFieldDecorator('billCode', {
                  rules: [{ required: true, message: '请输入..' }],
                })(<Input  />)}
              </FormItem></Col>
            <Col span={10} >
              <FormItem label="发票号码" {...formItemTwoLayout}>
                {getFieldDecorator('billNumber', {
                  rules: [{ required: true, message: '请输入..' }],
                })(<Input  />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={10} >
              <FormItem label="金额" {...formItemTwoLayout}>
                {getFieldDecorator('money', {
                  rules: [{ required: true, message: '请输入..' }],
                })(<Input  />)}
              </FormItem></Col>
            <Col span={10} >
              <FormItem label="税额" {...formItemTwoLayout}>
                {getFieldDecorator('rax', {
                  rules: [{ required: true, message: '请输入..' }],
                })(<Input  />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={10} >
              <FormItem label="税率" {...formItemTwoLayout}>
                {getFieldDecorator('raxRate', {
                  rules: [{ required: true, message: '请输入..' }],
                })(<Input  />)}
              </FormItem>
            </Col>
            <Col span={10} >
              <FormItem label="合计" {...formItemTwoLayout}>
                {getFieldDecorator('total', {
                  rules: [{ required: true, message: '请输入..' }],
                })(<Input  />)}
              </FormItem>
            </Col>
          </Row>
          <FormItem label="税额分配" {...formItemLayout}>
            <RadioGroup onChange={this.changeRaxDistribution} value={this.state.RaxDistribution}>
              <RadioButton  value="a">全转出</RadioButton >
              <RadioButton  value="b">全抵扣</RadioButton >
              <RadioButton  value="c">自定义</RadioButton >
              <RadioButton  value="d">按比例</RadioButton >
            </RadioGroup>
          </FormItem>

          {
            this.state.showOutMoney ?
              <Row gutter={8}>
                <Col span={10} >
                  <FormItem label="转出金额" {...formItemTwoLayout}>
                    {getFieldDecorator('taxTurnOut', {
                      rules: [{ required: true, message: '请输入..' }],
                    })(<Input  />)}
                  </FormItem>
                </Col>
                <Col span={10} >
                  <FormItem label="转出科目" {...formItemTwoLayout}>
                    {getFieldDecorator('taxTurnOutSubject', {
                      rules: [{ required: true, message: '请输入..' }],
                    })(<SelectInput options={formList.taxTurnOutSubjectsList}/>)}
                  </FormItem>
                </Col>
              </Row>
              : null
          }
          {
            this.state.showDeductible ?
              <Row gutter={8}>
                <Col span={10} >
                  <FormItem label="抵扣金额" {...formItemTwoLayout}>
                    {getFieldDecorator('taxDeduction', {
                      rules: [{ required: true, message: '请输入..' }],
                    })(<Input />)}
                  </FormItem>
                </Col>
                <Col span={10} >
                  {
                    this.state.showDeductible & this.state.showOutMoney ?
                      <FormItem label="比例" {...formItemTwoLayout}>
                        {getFieldDecorator('TurnOutDeductionRate', {
                          rules: [{ required: true, message: '请输入..' }],
                        })(<Input  />)}
                      </FormItem>
                    : null
                  }
                </Col>
              </Row>
              : null
          }

          <FormItem  label="备注" {...{...formItemLayout}} >
            {getFieldDecorator('remark', {})(
              <TextArea />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const CollectionCreateForm = Form.create()(CollectionForm);

class BillForm extends Component{
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleCreate = () => {
    const { onOk } = this.props;
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      onOk(values);
      this.setState({ visible: false });
    });
  };
  saveFormRef = (form) => {
    this.form = form;
  };
  render() {
    console.log("propsformlist");
    console.log(this.props.formList);
    return (
      <div>
        <Button type="primary" onClick={this.showModal}><Icon type="plus" />新增</Button>
        <CollectionCreateForm
          companyList={this.props.companyList}
          searchCompanyHandler={this.props.searchCompanyHandler}
          formList={this.props.formList}
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
export default BillForm;
