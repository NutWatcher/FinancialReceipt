import React from 'react';
import { connect } from 'dva';
import Page  from '../../components/Page/Page'
import List from './List';
import moment from 'moment';
import {Form, Button, Row, Col, DatePicker, Input, Icon, Menu, Dropdown, Select} from 'antd'
const Option = Select.Option;
const Search = Input.Search;
const InputGroup = Input.Group;
const { MonthPicker, RangePicker } = DatePicker;
import BillForm from './BillForm';
import Export from '../../components/BillForm/Export';

const BillSearchForm = ({ report, dispatch, formList, companyList, closeDate }) => {
  let selectSearchValue = "company";
  function createHandler(values) {
    dispatch({
      type: 'bills/create',
      payload: values,
    });
  }
  function searchHandler(values) {
    let options = {};
    options[selectSearchValue] = values;
    dispatch({
      type: 'bills/fetch',
      payload: {
        options:options
      }
    });
  }
  function searchCompany(values) {
    dispatch({
      type: 'company/fetch',
      payload: values,
    });
  }
  function closeDateChangeHandler(valueMoment, str) {
    console.log("closeDate");
    //console.log(values);
    console.log(str);
    dispatch({
      type: 'bills/setCloseDate',
      payload: str,
    });
  }
  function deleteHandler(values) {
    console.log("deleteHandler in");
    dispatch({
      type: 'bills/delete',
      payload: values,
    });
  }
  function changeSearchSelectHandler(value) {
    selectSearchValue = value;
  }
  return (
      <Row gutter={24}>
        <Col xl={{span: 2}} md={{span: 8}}>
          <BillForm
            formList = {formList}
            onOk={createHandler}
            searchCompanyHandler={searchCompany}
            companyList={companyList}
          />
        </Col>
        <Col xl={{span: 8}} md={{span: 24}} sm={{span: 24}}>
          <InputGroup compact>
            <Select defaultValue={selectSearchValue} style={{ width: 100 }} onChange={changeSearchSelectHandler}>
              <Option value="company">单位</Option>
              <Option value="department">部门</Option>
              <Option value="profession">专业</Option>
              <Option value="billCode">发票代码</Option>
              <Option value="billNumber">发票号码</Option>
            </Select>
            <Search
              placeholder="input search text"
              onSearch={searchHandler}
              enterButton
              style={{ width: 200 }}
            />
          </InputGroup>
        </Col>
        <Col xl={{span: 8}} offset={3} md={{span: 14}} sm={{span: 14}}>
          <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <div>
              <span style={{"color":"red",fontSize:"16px"}}>数据截断日期 : </span>
              <MonthPicker onChange={closeDateChangeHandler} value={moment(closeDate, 'YYYY/MM')} format={'YYYY/MM'} />
            </div>
          </div>
        </Col>
        <Col xl={{span: 2}} offset={0} md={{span: 14}} sm={{span: 14}}>
          <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <div>
              <Export report={report} dispatch={dispatch}>导出数据</Export>
            </div>
          </div>
        </Col>
      </Row>
  );
};

export default BillSearchForm;
