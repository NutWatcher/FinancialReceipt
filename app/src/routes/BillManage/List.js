import React , {Component} from 'react'
import {Table, Icon, Divider, Dropdown, Menu, Button, Modal} from 'antd'
import BillFormUpdate from '../../components/BillForm/BillFormUpdate';
import styles from './List.less';
const confirm = Modal.confirm;

//{listData, updateHandler, deleteHandler}
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateVisible: false,
            updateRecord: {}
        };
    };
    handleUpdateCancel = () => {
        this.setState({updateVisible: false});
    };
    handleUpdate = (values) => {
        this.setState({updateVisible: false});
        this.props.updateHandler(values);
    };
    MenuAction = (e, record) => {
        console.log(e);
        //console.log(record);
        if (e.key == 1) {
            console.log("update");
            this.setState({updateVisible:true,updateRecord: record});
            //updateHandler({id: value});
        }
        else if (e.key == 2) {
            console.log("delete");
            console.log(value);
            confirm({
                title: '确定要删除该条记录么?',
                content: '...',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                    console.log(record.id);
                    this.props.deleteHandler({id: record.id});
                },
                onCancel() {
                    console.log('Cancel');
                },
            });

        }
    };
    columns = [
        {title: '单位', dataIndex: 'companyName', key: 'companyName', render: text => <a href="#">{text}</a>},
        {title: '部门', dataIndex: 'departmentName', key: 'departmentName'},
        {title: '事项', dataIndex: 'matter', key: 'matter'},
        {title: '专业', dataIndex: 'professionName', key: 'professionName'},
        {title: '发票代码', dataIndex: 'billCode', key: 'billCode'},
        {title: '发票号码', dataIndex: 'billNumber', key: 'billNumber'},
        {title: '金额', dataIndex: 'money', key: 'money'},
        {title: '税率', dataIndex: 'taxRate', key: 'taxRate'},
        {title: '税额', dataIndex: 'tax', key: 'tax'},
        {title: '合计', dataIndex: 'total', key: 'total'},

        {
            title: '税额分配',
            key: 'suiEFenPei',
            render: (text, record) => {
                if (record.TurnOutDeductionRate == 1) {
                    return <p>全转出</p>;
                }
                else if (record.TurnOutDeductionRate == 0) {
                    return <span>全抵扣</span>;
                }
                else {
                    return <span>自定义</span>;
                }
            }
        },
        {
            title: '比例', key: 'TurnOutDeductionRate',
            render: (text, record) => {
                if (record.TurnOutDeductionRate == 0) {
                    return <span>0</span>;
                }
                else {
                    return <span> {record.TurnOutDeductionRate * 100}%</span>;
                }
            }
        },
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
                    <Menu onClick={(e) => this.MenuAction(e, record)}>
                        <Menu.Item key="1">修改</Menu.Item>
                        <Menu.Item key="2">删除</Menu.Item>
                    </Menu>
                }>
                    <Button style={{marginLeft: 8}}>
                        <Icon type="bars"/><Icon type="down"/>
                    </Button>
                </Dropdown>;
            }
        }];
    render() {


        for (let i = 0; i < this.props.listData.length; i++) {
            this.props.listData[i].key = this.props.listData[i]["id"];
        }
        return (
            <div className={styles.list_wrap}>
                <BillFormUpdate visible={this.state.updateVisible} handleCancel={this.handleUpdateCancel}
                                billData = {this.state.updateRecord}
                                updateHandler={this.handleUpdate}
                                searchCompanyHandler={this.props.searchCompanyHandler}
                                formList={this.props.formList} companyList={this.props.companyList} dispatch={this.props.dispatch}/>
                <Table bordered scroll={{x: '200%'}} columns={this.columns} dataSource={this.props.listData}/>
            </div>
        )
    }
}
export default List;
const data = [
    {
        key: '1',
        company: '嘉兴市真真老老食品有限公司',
        billCode: '3300161130',
        billNumber: '03079058',
        money: '41052.48',
        taxRate: '17%',
        taxPaid: '6978.92',
        total: '48031.40',
        moneyIn: '6978.92',
        isDeductible: '是',
        outSubject: '6602040201',
        department: '局办',
        item: '车修',
        source: '报销报账',
        remark: ''
    },
    {
        key: '2',
        company: '嘉兴市真真老老食品有限公司',
        billCode: '3300161130',
        billNumber: '03079058',
        money: '41052.48',
        taxRate: '17%',
        taxPaid: '6978.92',
        total: '48031.40',
        moneyIn: '6978.92',
        isDeductible: '是',
        outSubject: '6602040201',
        department: '局办',
        item: '车修',
        source: '报销报账',
        remark: '投递1247食堂3561'
    },
    {
        key: '3',
        company: '嘉兴市真真老老食品有限公司',
        billCode: '3300161130',
        billNumber: '03079058',
        money: '41052.48',
        taxRate: '17%',
        taxPaid: '6978.92',
        total: '48031.40',
        moneyIn: '6978.92',
        isDeductible: '是',
        outSubject: '6602040201',
        department: '局办',
        item: '车修',
        source: '报销报账',
        remark: ''
    }
];