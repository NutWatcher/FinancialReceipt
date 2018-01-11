import React from 'react'
import moment from 'moment'
import {Form, Button, Row, Col, DatePicker, Input, Icon, Menu, Dropdown, Select} from 'antd'
const Option = Select.Option;
const Search = Input.Search;
const {RangePicker} = DatePicker;
import BillForm from './BillForm'


const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
};

const TwoColProps = {
  ...ColProps,
  xl: 96,
};

const Filter = ({
                  onAdd,
                  isMotion,
                  switchIsMotion,
                  onFilterChange,
                  filter,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                  },
                }) => {

  const monthList = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );
  const departmentList = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1">局办</Menu.Item>
      <Menu.Item key="2">财务部</Menu.Item>
      <Menu.Item key="3">市场部</Menu.Item>
    </Menu>
  );
  return (
    <Row gutter={24}>
      <Col xl={{span: 2}} md={{span: 8}}>
        <BillForm />
      </Col>
      <Col xl={{span: 4}} md={{span: 8}} sm={{span: 12}}>
        <Search
          placeholder="单位"
          onSearch={value => console.log(value)}
          enterButton
        />
      </Col>
      <Col xl={{span: 4}} md={{span: 8}}>
        <Select defaultValue="all" style={{ width: 120 }}>
          <Option value="all">所有部门</Option>
          <Option value="jack">局办</Option>
          <Option value="lucy">财务部</Option>
          <Option value="Yiminghe">市场部</Option>
        </Select>
      </Col>

      {/*<Col xl={{span: 10}} md={{span: 24}} sm={{span: 24}}>*/}
        {/*<div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>*/}
          {/*<div>*/}
            {/*<Button >重置</Button>*/}
          {/*</div>*/}
        {/*</div>*/}
      {/*</Col>*/}
      <Col xl={{span: 4}} offset={10} md={{span: 14}} sm={{span: 14}}>
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <div>
            <Button >导出数据</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
};
export default Form.create()(Filter)
