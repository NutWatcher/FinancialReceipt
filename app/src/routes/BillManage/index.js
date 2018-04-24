import React from 'react';
import {connect} from 'dva';
import Page from '../../components/Page/Page'
import List from './List';

import {Form, Button, Row, Col, DatePicker, Input, Icon, Menu, Dropdown, Select} from 'antd'

const Option = Select.Option;
const Search = Input.Search;
const {RangePicker} = DatePicker;
import BillForm from './BillForm';
import BillFormUpdate from '../../components/BillForm/BillFormUpdate';
import BillSearchForm from './BillSearchForm';

const BillManage = ({report, dispatch, companyList, closeDate, list: dataSource, loading, total, page: current, formList}) => {
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
    function searchCompanyHandler(values) {
        dispatch({
            type: 'company/fetch',
            payload: values,
        });
    }
    return (
        <Page>
            <BillSearchForm report={report} dispatch={dispatch} closeDate={closeDate} companyList={companyList}
                            formList={formList}/>
            <List formList={formList} companyList={companyList} dispatch={dispatch} searchCompanyHandler={searchCompanyHandler}
                listData={dataSource} updateHandler={updateHandler} deleteHandler={deleteHandler}/>
        </Page>
    );
};

function mapStateToProps(state) {
    const {list, total, page, formList, closeDate} = state.bills;
    const {list: companyList} = state.company;
    const report = state.report;
    console.log("billsformlist");
    console.log(formList);
    return {
        closeDate,
        companyList,
        formList,
        list,
        total,
        page,
        report
    };
}

export default connect(mapStateToProps)(BillManage);
