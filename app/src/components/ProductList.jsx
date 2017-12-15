"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var ProductList = function (_a) {
    var onDelete = _a.onDelete, products = _a.products;
    var columns = [{
            title: 'Name',
            dataIndex: 'name',
        }, {
            title: 'Actions',
            render: function (text, record) {
                return (<antd_1.Popconfirm title="Delete?" onConfirm={function () { return onDelete(record.id); }}>
          <antd_1.Button>Delete</antd_1.Button>
        </antd_1.Popconfirm>);
            },
        }];
    return (<antd_1.Table dataSource={products} columns={columns}/>);
};
exports.default = ProductList;
