import React, {Component} from 'react';
import moment from 'moment';
import {
  Form,
  Input,
  Modal,
  Tooltip,
  Button,
  Icon,
  Select,
  Row,
  Col,
  Checkbox,
  AutoComplete,
  Radio,
  DatePicker,
  Steps
} from 'antd';
import BillForm from "../../routes/BillManage/BillForm";
const { MonthPicker, RangePicker } = DatePicker;
const Step = Steps.Step;
const steps = [{
  title: '选择报表类型',
  content: 'First-content',
}, {
  title: '选择参数',
  content: 'Second-content',
}, {
  title: '完成',
  content: 'Last-content',
}];

class Export extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      current: 0,
      reportName:"",
      params:{}
    };
  };
  changeParams = (paramName, e) => {
    let v = e;
    console.log(v);
    this.state.params[paramName] = v ;
    this.setState({params : {...this.state.params}}) ;
  };
  goToStepTwo = (reportName) => {
    this.state.params = {};
    if (reportName == '转出科目汇总'){
      this.state.params = {
        date:"2017-01" ,
        departmentName:"other"
      }
    }
    this.setState({current:1, reportName:reportName, params: this.state.params});
  };
  goToFinish() {
    const current = this.state.current + 1;
    this.props.dispatch({
      type: 'report/generateReport',
      payload: {
        reportName:this.state.reportName,
        params:this.state.params,
      },
    });
    this.setState({current});
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({current});
  }

  showModal = () => {
    this.setState({
      current: 0,
      visible: true,
    });
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {current} = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>导出数据</Button>
        <Modal
          title="报表导出"
          width={800}
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="关闭"
          footer={[
            <Button key="back" onClick={this.hideModal}>关闭</Button>,
          ]}
        >
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title}/>)}
          </Steps>
          <div className="steps-content" style={{height: '300px'}}>
            {
              this.state.current == 0
              &&
              <Row gutter={10} style={{ marginTop: 16 }}>
                <Col className="gutter-row" offset={1} span={3}>
                  <Button onClick={() => this.goToStepTwo('转出科目汇总')}>转出科目汇总</Button>
                </Col>
              </Row>
            }
            {
              this.state.current == 2
              &&
              <Row gutter={10} style={{ marginTop: 16 }}>
                <Col className="gutter-row" offset={1} >

                  {
                    this.props.report.fileState == "start" &&
                    <p ><Icon type="loading" /> 后台生成中...</p>
                  }
                  {
                    this.props.report.fileState == "finish" &&
                    <div>
                      <Button href={this.props.report.fileUrl} target="_blank">下载报表: {this.props.report.fileName}</Button>
                    </div>
                  }
                </Col>
              </Row>
            }
            {
              this.state.current == 1 && this.state.reportName == '转出科目汇总' &&
              <div>
                <p style={{textAlign:"center",fontSize:"25px"}}>{this.state.reportName}</p>
                <Row gutter={10}>
                  <Col className="gutter-row" offset={1} span={3}>
                    <p style={{fontSize:"16px",lineHeight:"32px"}}>日期选择 : </p>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <MonthPicker defaultValue={moment(this.state.params.date, 'YYYY-MM')} format={'YYYY-MM'}
                                 onChange={(date, str) => {this.changeParams("date", str)}} />
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col className="gutter-row" offset={1} span={3}>
                    <p style={{fontSize:"16px",lineHeight:"32px"}}>部门选择 : </p>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <Select defaultValue={this.state.params.departmentName} style={{ width: 120 }}
                            onChange={this.changeParams.bind(null, "departmentName")} >
                      <Select.Option value="transportCentre">中心局</Select.Option>
                      <Select.Option value="other">其他</Select.Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            }
          </div>
          <div className="steps-action">
            <Row gutter={10} type="flex" justify="end">
              {
                this.state.current== 1
                &&
                <Col ><Button type="primary" onClick={() => this.goToFinish()}>下一步</Button></Col>
              }
              {
                this.state.current== 1
                &&
                <Col  >
                  <Button  onClick={() => this.prev()}>
                    上一步
                  </Button>
                </Col>

              }

            </Row>

          </div>
        </Modal>
      </div>
    )
  }
}

export default Export;
