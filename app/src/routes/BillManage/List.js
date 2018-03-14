import React from 'react'
import { Table, Icon, Divider , Dropdown, Menu, Button,Modal } from 'antd'

import styles from './List.less';
const confirm = Modal.confirm;
const List = ({ listData, updateHandler, deleteHandler}) => {
  const dropMenu = (
    <Dropdown overlay={
      <Menu >
        <Menu.Item key="1">修改</Menu.Item>
        <Menu.Item key="2">删除</Menu.Item>
      </Menu>
    }>
      <Button style={{ marginLeft: 8 }}>
        <Icon type="bars" /><Icon type="down" />
      </Button>
    </Dropdown>
  );
  function MenuAction(e, value) {
    console.log(e);
    if (e.key == 1){
      console.log("update");
      updateHandler({id: value});
    }
    else if (e.key == 2){
      console.log("delete");
      console.log(value);
      confirm({
        title: '确定要删除该条记录么?',
        content: '...',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          console.log(value);
          deleteHandler({id: value});
        },
        onCancel() {
          console.log('Cancel');
        },
      });

    }
  };
  const columns = [
    {title: '单位', dataIndex: 'companyName', key: 'companyName', render: text => <a href="#">{text}</a>},
    {title: '部门', dataIndex: 'departmentName', key: 'departmentName'},
    {title: '事项', dataIndex: 'matter', key: 'matter'},
    {title: '专业', dataIndex: 'profession', key: 'profession'},
    {title: '发票代码', dataIndex: 'billCode', key: 'billCode'},
    {title: '发票号码', dataIndex: 'billNumber', key: 'billNumber'},
    {title: '金额', dataIndex: 'money', key: 'money'},
    {title: '税率', dataIndex: 'taxRate', key: 'taxRate'},
    {title: '税额', dataIndex: 'tax', key: 'tax'},
    {title: '合计', dataIndex: 'total', key: 'total'},

    {title: '税额分配',
      key: 'suiEFenPei',
      render: (text, record) => {
        if (record.TurnOutDeductionRate == 1){
          return <p>全转出</p>;
        }
        else if (record.TurnOutDeductionRate == 0){
          return <span>全抵扣</span>;
        }
        else {
          return <span>自定义</span>;
        }
      }
    },
    {title: '比例', key: 'TurnOutDeductionRate',
      render: (text, record) => {
        if (record.TurnOutDeductionRate == 0){
          return <span>0</span>;
        }
        else {
          return <span> {record.TurnOutDeductionRate * 100}%</span>;
        }
      }},
    {title: '抵扣金额', dataIndex: 'taxDeduction', key: 'taxDeduction'},
    {title: '转出金额', dataIndex: 'taxTurnOut', key: 'taxTurnOut'},
    {title: '转出科目', dataIndex: 'taxTurnOutSubjectName', key: 'taxTurnOutSubjectName'},
    {title: '认证时间', dataIndex: 'authenticationDate', key: 'authenticationDate'},
    {title: '备注', dataIndex: 'remark', key: 'remark'},
    {
      title: '操作',
      fixed: 'right',
      key: 'action',
      render: (text, record) => {
        return <Dropdown overlay={
          <Menu onClick={(e) => MenuAction(e, record.id)}>
            <Menu.Item key="1">修改</Menu.Item>
            <Menu.Item key="2">删除</Menu.Item>
          </Menu>
        }>
          <Button style={{ marginLeft: 8 }}>
            <Icon type="bars" /><Icon type="down" />
          </Button>
        </Dropdown>;
      }
  }];
  const data = [
    {
      key: '1', company: '嘉兴市真真老老食品有限公司', billCode: '3300161130', billNumber: '03079058',
      money: '41052.48', taxRate: '17%', taxPaid: '6978.92', total: '48031.40', moneyIn: '6978.92', isDeductible: '是',
      outSubject: '6602040201', department: '局办', item: '车修', source: '报销报账', remark: ''},
    {
      key: '2', company: '嘉兴市真真老老食品有限公司', billCode: '3300161130', billNumber: '03079058',
      money: '41052.48', taxRate: '17%', taxPaid: '6978.92', total: '48031.40', moneyIn: '6978.92', isDeductible: '是',
      outSubject: '6602040201', department: '局办', item: '车修', source: '报销报账', remark: '投递1247食堂3561'},
    {
      key: '3', company: '嘉兴市真真老老食品有限公司', billCode: '3300161130', billNumber: '03079058',
      money: '41052.48', taxRate: '17%', taxPaid: '6978.92', total: '48031.40', moneyIn: '6978.92', isDeductible: '是',
      outSubject: '6602040201', department: '局办', item: '车修', source: '报销报账', remark: ''}
    ];
  for(let i = 0 ; i < listData.length ; i ++){
    listData[i].key = listData[i]["id"];
  }
  return (
    <div className={styles.list_wrap}>
      <Table bordered scroll={{ x: '200%' }} columns={columns} dataSource={listData} />
    </div>
  )
};

export default List
