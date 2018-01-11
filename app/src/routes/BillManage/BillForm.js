import React from 'react';
import styles from './BillForm.less';
import { Modal, Button } from 'antd';
import { Form, Input, Switch, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, AutoComplete, Radio  } from 'antd';
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

class CollectionForm extends React.Component{
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
    }
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
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal width={900} visible={visible} style={{ top: 20 }}
        title="新增台账" okText="新增"
        onCancel={onCancel} onOk={onCreate}
      >
        <Form layout="horizontal">
          <Row gutter={8}>
            <Col span={10} >
              <FormItem  label="公司名称1" {...formItemTwoLayout}>
                {getFieldDecorator('company', {
                  rules: [{ required: true, message: '请输入公司名称!' }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={10} >
              <FormItem label="部门" {...formItemTwoLayout}>
                {getFieldDecorator('billNumber', {
                  rules: [{ required: true, message: '请输入发票号码!' }],
                })(<Input  />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={10} >
              <FormItem label="事项" {...formItemTwoLayout}>
                {getFieldDecorator('billNumber', {
                  rules: [{ required: true, message: '请输入发票号码!' }],
                })(<Input  />)}
              </FormItem>
            </Col>
            <Col span={10} >
              <FormItem label="专业" {...formItemTwoLayout}>
                {getFieldDecorator('billNumber', {
                  rules: [{ required: true, message: '请输入发票号码!' }],
                })(<Input  />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={10} >
              <FormItem label="发票代码" {...formItemTwoLayout}>
                {getFieldDecorator('billCode', {
                  rules: [{ required: true, message: '请输入发票代码!' }],
                })(<Input  />)}
              </FormItem></Col>
            <Col span={10} >
              <FormItem label="发票号码" {...formItemTwoLayout}>
                {getFieldDecorator('billNumber', {
                  rules: [{ required: true, message: '请输入发票号码!' }],
                })(<Input  />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={10} >
              <FormItem label="金额" {...formItemTwoLayout}>
                {getFieldDecorator('billCode', {
                  rules: [{ required: true, message: '请输入发票代码!' }],
                })(<Input  />)}
              </FormItem></Col>
            <Col span={10} >
              <FormItem label="税额" {...formItemTwoLayout}>
                {getFieldDecorator('billNumber', {
                  rules: [{ required: true, message: '请输入发票号码!' }],
                })(<Input  />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={10} >
              <FormItem label="税率" {...formItemTwoLayout}>
                {getFieldDecorator('billNumber', {
                  rules: [{ required: true, message: '请输入发票号码!' }],
                })(<Input  />)}
              </FormItem>
            </Col>
            <Col span={10} >
              <FormItem label="合计" {...formItemTwoLayout}>
                {getFieldDecorator('billNumber', {
                  rules: [{ required: true, message: '请输入发票号码!' }],
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
                    {getFieldDecorator('billNumber', {
                      rules: [{ required: true, message: '请输入发票号码!' }],
                    })(<Input  />)}
                  </FormItem>
                </Col>
                <Col span={10} >
                  <FormItem label="转出科目" {...formItemTwoLayout}>
                    {getFieldDecorator('billNumber', {
                      rules: [{ required: true, message: '请输入发票号码!' }],
                    })(<Input  />)}
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
                    {getFieldDecorator('billNumber', {
                      rules: [{ required: true, message: '请输入发票号码!' }],
                    })(<Input />)}
                  </FormItem>
                </Col>
                <Col span={10} >
                  {
                    this.state.showDeductible & this.state.showOutMoney ?
                      <FormItem label="比例" {...formItemTwoLayout}>
                        {getFieldDecorator('billNumber', {
                          rules: [{ required: true, message: '请输入发票号码!' }],
                        })(<Input  />)}
                      </FormItem>
                    : null
                  }
                </Col>
              </Row>
              : null
          }

          <FormItem  label="备注" {...{...formItemLayout}} >
            {getFieldDecorator('company', {})(
              <TextArea />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const CollectionCreateForm = Form.create()(CollectionForm);

class BillForm extends React.Component {
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}><Icon type="plus" />新增</Button>
        <CollectionCreateForm
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



// const CollectionCreateForm = Form.create()(
//   (props) => {
//
//     const { visible, onCancel, onCreate, form } = props;
//     const { getFieldDecorator } = form;
//     const formItemLayout = {
//       labelCol: { span: 5 },
//       wrapperCol: { span: 15 },
//     };
//     const formItemTwoLayout = {
//       labelCol: { span: 12 },
//       wrapperCol: { span: 12 },
//     };
//     changeRaxDistribution = (e) => {
//       console.log('radio checked', e.target.value);
//       this.setState({
//         value: e.target.value,
//       });
//     };
//     return (
//       <Modal
//         width={900}
//         visible={visible}
//         style={{ top: 20 }}
//         title="新增台账"
//         okText="新增"
//         onCancel={onCancel}
//         onOk={onCreate}
//       >
//         <Form layout="horizontal">
//
//           <Row gutter={8}>
//             <Col span={10} >
//               <FormItem  label="公司名称1" {...formItemTwoLayout}>
//                 {getFieldDecorator('company', {
//                   rules: [{ required: true, message: '请输入公司名称!' }],
//                 })(
//                   <Input />
//                 )}
//               </FormItem>
//             </Col>
//             <Col span={10} >
//               <FormItem label="部门" {...formItemTwoLayout}>
//                 {getFieldDecorator('billNumber', {
//                   rules: [{ required: true, message: '请输入发票号码!' }],
//                 })(<Input  />)}
//               </FormItem>
//             </Col>
//           </Row>
//           <Row gutter={8}>
//             <Col span={10} >
//               <FormItem label="事项" {...formItemTwoLayout}>
//                 {getFieldDecorator('billNumber', {
//                   rules: [{ required: true, message: '请输入发票号码!' }],
//                 })(<Input  />)}
//               </FormItem>
//             </Col>
//             <Col span={10} >
//               <FormItem label="专业" {...formItemTwoLayout}>
//                 {getFieldDecorator('billNumber', {
//                   rules: [{ required: true, message: '请输入发票号码!' }],
//                 })(<Input  />)}
//               </FormItem>
//             </Col>
//           </Row>
//           <Row gutter={8}>
//             <Col span={10} >
//               <FormItem label="发票代码" {...formItemTwoLayout}>
//                 {getFieldDecorator('billCode', {
//                   rules: [{ required: true, message: '请输入发票代码!' }],
//                 })(<Input  />)}
//               </FormItem></Col>
//             <Col span={10} >
//               <FormItem label="发票号码" {...formItemTwoLayout}>
//                 {getFieldDecorator('billNumber', {
//                   rules: [{ required: true, message: '请输入发票号码!' }],
//                 })(<Input  />)}
//               </FormItem>
//             </Col>
//           </Row>
//           <Row gutter={8}>
//             <Col span={10} >
//               <FormItem label="金额" {...formItemTwoLayout}>
//                 {getFieldDecorator('billCode', {
//                   rules: [{ required: true, message: '请输入发票代码!' }],
//                 })(<Input  />)}
//               </FormItem></Col>
//             <Col span={10} >
//               <FormItem label="税额" {...formItemTwoLayout}>
//                 {getFieldDecorator('billNumber', {
//                   rules: [{ required: true, message: '请输入发票号码!' }],
//                 })(<Input  />)}
//               </FormItem>
//             </Col>
//           </Row>
//           <Row gutter={8}>
//             <Col span={10} >
//               <FormItem label="税率" {...formItemTwoLayout}>
//                 {getFieldDecorator('billNumber', {
//                   rules: [{ required: true, message: '请输入发票号码!' }],
//                 })(<Input  />)}
//               </FormItem>
//             </Col>
//             <Col span={10} >
//               <FormItem label="合计" {...formItemTwoLayout}>
//                 {getFieldDecorator('billNumber', {
//                   rules: [{ required: true, message: '请输入发票号码!' }],
//                 })(<Input  />)}
//               </FormItem>
//             </Col>
//           </Row>
//           <FormItem label="税额分配" {...formItemLayout}>
//             {getFieldDecorator('billNumber', {
//               rules: [{ required: true, message: '请输入发票号码!' }],
//             })(
//               <RadioGroup onChange={this.changeRaxDistribution} value={this.state.RaxDistribution}>
//                 <RadioButton  value="a">全抵扣</RadioButton >
//                 <RadioButton  value="b">全转出</RadioButton >
//                 <RadioButton  value="c">自定义</RadioButton >
//                 <RadioButton  value="d">按比例</RadioButton >
//               </RadioGroup>
//             )}
//           </FormItem>
//
//           <Row gutter={8}>
//             <Col span={10} >
//               <FormItem label="转出金额" {...formItemTwoLayout}>
//                 {getFieldDecorator('billNumber', {
//                   rules: [{ required: true, message: '请输入发票号码!' }],
//                 })(<Input  />)}
//               </FormItem>
//             </Col>
//             <Col span={10} >
//               <FormItem label="转出科目" {...formItemTwoLayout}>
//                 {getFieldDecorator('billNumber', {
//                   rules: [{ required: true, message: '请输入发票号码!' }],
//                 })(<Input  />)}
//               </FormItem>
//             </Col>
//           </Row>
//           <Row gutter={8}>
//             <Col span={10} >
//               <FormItem label="抵扣金额" {...formItemTwoLayout}>
//                 {getFieldDecorator('billNumber', {
//                   rules: [{ required: true, message: '请输入发票号码!' }],
//                 })(<Input />)}
//               </FormItem>
//             </Col>
//             <Col span={10} >
//               <FormItem label="比例" {...formItemTwoLayout}>
//                 {getFieldDecorator('billNumber', {
//                   rules: [{ required: true, message: '请输入发票号码!' }],
//                 })(<Input  />)}
//               </FormItem>
//             </Col>
//           </Row>
//           <FormItem  label="备注" {...{...formItemLayout}} >
//             {getFieldDecorator('company', {})(
//               <TextArea />
//             )}
//           </FormItem>
//         </Form>
//       </Modal>
//     );
//   }
// );
