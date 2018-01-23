import React from 'react';
import { connect } from 'dva';
import Page  from '../../components/Page/Page'
import List from './List';

import {Form, Button, Row, Col, DatePicker, Input, Icon, Menu, Dropdown, Select} from 'antd'
const Option = Select.Option;
const Search = Input.Search;
const {RangePicker} = DatePicker;
import BillForm from './BillForm'

const BillManage = ({ dispatch, list: dataSource, loading, total, page: current }) => {
  function createHandler(values) {
    dispatch({
      type: 'bills/create',
      payload: values,
    });
  }
  return (
    <Page>
      <Row gutter={24}>
        <Col xl={{span: 2}} md={{span: 8}}>
          <BillForm onOk={createHandler}/>
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
        <Col xl={{span: 4}} offset={10} md={{span: 14}} sm={{span: 14}}>
          <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <div>
              <Button >导出数据</Button>
            </div>
          </div>
        </Col>
      </Row>
      <List listData = {dataSource}/>
    </Page>
  );
};

function mapStateToProps(state) {
  const { list, total, page } = state.bills;
  return {
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(BillManage);
