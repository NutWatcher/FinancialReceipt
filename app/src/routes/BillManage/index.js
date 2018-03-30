import React from 'react';
import { connect } from 'dva';
import Page  from '../../components/Page/Page'
import List from './List';

import {Form, Button, Row, Col, DatePicker, Input, Icon, Menu, Dropdown, Select} from 'antd'
const Option = Select.Option;
const Search = Input.Search;
const {RangePicker} = DatePicker;
import BillForm from './BillForm';
import BillSearchForm from './BillSearchForm';

const BillManage = ({ dispatch, companyList, closeDate,list: dataSource, loading, total, page: current, formList }) => {
  function createHandler(values) {
    dispatch({
      type: 'bills/create',
      payload: values,
    });
  }
  function updateHandler(values) {
    dispatch({
      type: 'bills/update',
      payload: values,
    });
  }
  function deleteHandler(values) {
    console.log("deleteHandler in");
    dispatch({
      type: 'bills/delete',
      payload: values,
    });
  }
  return (
    <Page>
      <BillSearchForm  dispatch={dispatch} closeDate={closeDate} companyList={companyList} formList={formList} />
      <List listData = {dataSource} updateHandler={updateHandler} deleteHandler={deleteHandler}/>
    </Page>
  );
};

function mapStateToProps(state) {
  const { list, total, page, formList, closeDate } = state.bills;
  const { list: companyList } = state.company;
  console.log("billsformlist");
  console.log(formList);
  return {
    closeDate,
    companyList,
    formList,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(BillManage);
