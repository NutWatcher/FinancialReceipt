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
      opValue:this.props.value || "",
      Svalue:this.props.value || ""
    }
  }
  handleSelectChange = (value) => {
    //this.props.onChange(value);
    //this.setState({ Svalue: value });
    this.props.searchCompanyHandler(value);
    this.setState({opValue:value,Svalue:value});
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
  handleSelectChange = (value) => {
    this.props.onChange(value);
  };
  render() {
    return (
      <Select
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
    this.state = {
      RaxDistribution: "",
      currentTax:"",
      currentTaxRate:""
    };
  };
  changeTaxTurnOut = (e) => {
    let v = +e.target.value ;
    let taxTurnOut = v.toFixed(2);
    let taxDeduction = (this.state.currentTax - v).toFixed(2);
    this.props.form.setFieldsValue({taxTurnOut:v, taxDeduction});
  };
  changeTurnOutDeductionRate = (e) => {
    let v = e.target.value ;
    let taxTurnOut = (this.state.currentTax * v).toFixed(2);
    let taxDeduction = (this.state.currentTax - taxTurnOut).toFixed(2);
    this.props.form.setFieldsValue({taxTurnOut, taxDeduction});
  };
  changeCurrentRax = ( param, e) => {
    console.log('changeCurrentRax', e.target.value);
    let v = e.target.value ;
    let vv = this.props.form.getFieldsValue(['money','tax']);
    console.log(vv);
    let currentTaxRate = "0";
    if (param == 'money'){
      currentTaxRate = vv['tax']/v;
    }
    else {
      this.state.currentTax = v ;
      currentTaxRate = v/vv['money'];
      let taxTurnOut = v;
      let taxDeduction = v;
      if (this.state.RaxDistribution == 'c'){
        taxTurnOut = this.props.form.getFieldsValue(['taxTurnOut'])['taxTurnOut'];
        taxDeduction = v-taxTurnOut;
      }
      else if (this.state.RaxDistribution == 'd'){
        let TurnOutDeductionRate = this.props.form.getFieldsValue(['TurnOutDeductionRate'])['TurnOutDeductionRate'];
        taxTurnOut = (TurnOutDeductionRate * v).toFixed(2);
        taxDeduction = (v - taxTurnOut).toFixed(2);
      }
      this.props.form.setFieldsValue({taxTurnOut, taxDeduction});
    }
    this.setState({currentTaxRate, currentTax: this.state.currentTax});
  };
  changeRaxDistribution = (e) => {
    console.log('radio checked', e.target.value);
    let RaxDistribution = e.target.value ;
    let taxTurnOut = this.state.currentTax;
    let taxDeduction = this.state.currentTax;
    if(RaxDistribution == 'c' || RaxDistribution =='d'){
      taxTurnOut = "";
      taxDeduction = "";
    }
    this.props.form.setFieldsValue({taxTurnOut, taxDeduction});
    this.setState({RaxDistribution});
  };
  render() {
    const { visible, onCancel, onCreate, form, formList, companyList, searchCompanyHandler } = this.props;
    const { getFieldDecorator } = form;
    //console.log("companyList");
    //console.log(companyList);
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
                  rules: [
                    { required: true, message: '请输入数字类型',
                      validator: (rule, value, cb) => ( !isNaN(value) ? cb() : cb(true))}],
                })(<Input  onChange={this.changeCurrentRax.bind(this, 'money')} />)}
              </FormItem></Col>
            <Col span={10} >
              <FormItem label="税额" {...formItemTwoLayout}>
                {getFieldDecorator('tax', {
                  rules: [
                    { required: true, message: '请输入数字类型',
                      validator: (rule, value, cb) => ( !isNaN(value) ? cb() : cb(true))}],
                })(<Input  onChange={this.changeCurrentRax.bind(this, 'tax')}/>)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={10} >
              <FormItem label="税率" {...formItemTwoLayout}>
                {getFieldDecorator('taxRate', {
                  rules: [{ required: true, message: '请输入..' }],
                })(
                  <SelectInput options={[
                    {name:"1.5%",id:"1.5%"},
                    {name:"3%",id:"3%"},
                    {name:"5%",id:"5%"},
                    {name:"6%",id:"6%"},
                    {name:"11%",id:"11%"},
                    {name:"12%",id:"12%"},
                    {name:"17%",id:"17%"}
                  ]}/>)}
                <span>{this.state.currentTaxRate}</span>
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
            {getFieldDecorator('TaxDistribution', {
              rules: [{ required: true, message: '请输入..' }],
            })(
              <RadioGroup onChange={this.changeRaxDistribution} >
                <RadioButton  value="a">全转出</RadioButton >
                <RadioButton  value="b">全抵扣</RadioButton >
                <RadioButton  value="c">自定义</RadioButton >
                <RadioButton  value="d">按比例</RadioButton >
              </RadioGroup>
            )}
          </FormItem>
          {
            this.state.RaxDistribution != 'b' &&  this.state.RaxDistribution != '' ?
              <Row gutter={8}>
                <Col span={10} >
                  <FormItem label="转出金额" {...formItemTwoLayout}>
                    {getFieldDecorator('taxTurnOut', {
                      initialValue:this.state.RaxDistribution == 'a' ? this.state.currentTax : 0,
                      rules: [{ required: true, message: '请输入数字类型参数',
                      validator: (rule, value, cb) => ( !isNaN(value) ? cb() : cb(true))}],
                    })(<Input disabled={this.state.RaxDistribution != 'c'}
                              onChange={this.changeTaxTurnOut}/>)}
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
            this.state.RaxDistribution != 'a' &&  this.state.RaxDistribution != ''?
              <Row gutter={8}>
                <Col span={10} >
                  <FormItem label="抵扣金额" {...formItemTwoLayout}>
                    {getFieldDecorator('taxDeduction', {
                      initialValue:this.state.RaxDistribution == 'b' ? this.state.currentTax : 0,
                      rules: [{ required: true, message: '请输入..' }],
                    })(<Input disabled={true}/>)}
                  </FormItem>
                </Col>
                <Col span={10} >
                  { this.state.RaxDistribution == 'd' ?
                    <FormItem label="比例" {...formItemTwoLayout}>
                      {getFieldDecorator('TurnOutDeductionRate', {
                        rules: [{required: true, message: '请输入数字类型参数',
                          validator: (rule, value, cb) => ( !isNaN(value) ? cb() : cb(true))}],
                      })(<Input disabled={this.state.RaxDistribution != 'd'}
                                onChange={this.changeTurnOutDeductionRate}/>)}
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
