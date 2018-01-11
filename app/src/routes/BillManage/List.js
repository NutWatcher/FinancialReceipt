import React from 'react'
import { Table, Icon, Divider , Dropdown, Menu, Button } from 'antd'

import styles from './List.less';

const List = ({ }) => {
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
  const columns = [
    {title: '单位', dataIndex: 'company', key: 'company', render: text => <a href="#">{text}</a>},
    {title: '发票代码', dataIndex: 'billCode', key: 'billCode'},
    {title: '发票号码', dataIndex: 'billNumber', key: 'billNumber'},
    {title: '金额', dataIndex: 'money', key: 'money'},
    {title: '税率', dataIndex: 'taxRate', key: 'taxRate'},
    {title: '税额', dataIndex: 'taxPaid', key: 'taxPaid'},
    {title: '合计', dataIndex: 'total', key: 'total'},
    {title: '入账金额', dataIndex: 'moneyIn', key: 'moneyIn'},
    {title: '抵扣', dataIndex: 'isDeductible', key: 'isDeductible'},
    {title: '转出科目', dataIndex: 'outSubject', key: 'outSubject'},
    {title: '部门', dataIndex: 'department', key: 'department'},
    {title: '事项', dataIndex: 'item', key: 'item'},
    {title: '来源', dataIndex: 'source', key: 'source'},
    {title: '备注', dataIndex: 'remark', key: 'remark'},
    {
      title: '操作',
      fixed: 'right',
      key: 'action',
      render: (text, record) => {
        return dropMenu;
      },
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
  return (
    <div className={styles.list_wrap}>
      <Table bordered scroll={{ x: '130%' }} columns={columns} dataSource={data} />
    </div>
  )
};

export default List
