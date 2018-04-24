import fs from 'fs';
import xlsx from 'node-xlsx';
import path from 'path';
var downloadDir = path.join(__dirname, '../public/downloads/');
class Excel{
    constructor() {
    }
    /*
     导出订单详情
     */
    static GroupByTurnOutSubject(dataIn, fileName) {
        return new Promise(async (resolve, reject) => {
            console.log('GroupByTurnOutSubject');
            console.log(fileName);
            try {
                let ownDepartmentLength = 3;
                let centerDepartmentLength = 2;
                var ws = {};
                let tempData =  [
                    ["1405010101 库存商品", 3],
                    ["1405010101 库存商品", 31],
                    ["1405010101 库存商品11", 2],
                    ["1405010101 库存商品", 3],
                    ["1405010101 库存商品", 31],
                    ["1405010101 库存商品11", 2]
                ];

                ownDepartmentLength = dataIn.ownDepartment.length ;
                centerDepartmentLength = dataIn.centerDepartment.length ;
                //2018年1月进项转出汇总表
                let data = [[
                    {
                    v: fileName + "进项转出汇总表",
                    s:{
                        alignment: {vertical:"center", horizontal:"center"},
                        font: { sz: 14, bold: true},
                        border:{
                            right: { style:"thin", color: { rgb: "FF000000" }}
                        }
                    }
                },{},
                    {
                    v:"",
                    s:{
                        font: { sz: 14, bold: true},
                        border:{
                            right: { style:"thin", color: { rgb: "FF000000" }}
                        }
                    }}]];
                //单位,转出科目...
                data.push([
                    {
                        v:"单位",
                        s:{
                            border:{
                                top: { style:"thin", color: { rgb: "FF000000" }},
                                right: { style:"thin", color: { rgb: "FF000000" }},
                                bottom: { style:"thin", color: { rgb: "FF000000" }}
                            }}
                    },
                    {
                        v:"转出科目",
                        s:{
                            border:{
                                top: { style:"thin", color: { rgb: "FF000000" }},
                                right: { style:"thin", color: { rgb: "FF000000" }},
                                bottom: { style:"thin", color: { rgb: "FF000000" }}
                            }}
                    },
                    {
                        v:"转出金额",
                        s:{
                            border:{
                                top: { style:"thin", color: { rgb: "FF000000" }},
                                right: { style:"thin", color: { rgb: "FF000000" }},
                                bottom: { style:"thin", color: { rgb: "FF000000" }}
                            }}
                    }
                ]);
                let ownTotal = 0 ;
                for (let i = 0 ; i < ownDepartmentLength; i ++){
                    ownTotal += +dataIn["ownDepartment"][i][1];
                    data.push([
                        {
                            v:"本级",
                            s:{
                                font: { sz: 11, bold: true,color: { rgb: "FFFFAA00" }},
                                alignment: {vertical:"center", horizontal:"center"}
                            }
                        },
                        {
                            v:dataIn["ownDepartment"][i][0],
                            s:{
                                border:{
                                    left: { style:"thin", color: { rgb: "FF000000" }},
                                    right: { style:"thin", color: { rgb: "FF000000" }},
                                    bottom: { style:"thin", color: { rgb: "FF000000" }}
                                },
                                alignment: {vertical:"center", horizontal:"left"}
                            }
                        },
                        {
                            v:dataIn["ownDepartment"][i][1],
                            s:{
                                border:{
                                    left: { style:"thin", color: { rgb: "FF000000" }},
                                    right: { style:"thin", color: { rgb: "FF000000" }},
                                    bottom: { style:"thin", color: { rgb: "FF000000" }}
                                },
                                alignment: {vertical:"center", horizontal:"right"}
                            }
                        }]);
                }
                data.push([
                    {
                        v:"本级汇总",
                        s:{
                            border:{
                                top: { style:"thin", color: { rgb: "FF000000" }},
                                right: { style:"thin", color: { rgb: "FF000000" }},
                                bottom: { style:"thin", color: { rgb: "FF000000" }}
                            },
                            fill:{bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" }},
                            alignment: {vertical:"center", horizontal:"center"}
                        }
                    },
                    {
                        v:"本级汇总",
                        s:{
                            border:{
                                top: { style:"thin", color: { rgb: "FF000000" }},
                                right: { style:"thin", color: { rgb: "FF000000" }},
                                bottom: { style:"thin", color: { rgb: "FF000000" }}
                            },
                            fill:{bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" }},
                            alignment: {vertical:"center", horizontal:"center"}
                        }
                    },
                    {
                        v: ownTotal,
                        s:{
                            border:{
                                top: { style:"thin", color: { rgb: "FF000000" }},
                                right: { style:"thin", color: { rgb: "FF000000" }},
                                bottom: { style:"thin", color: { rgb: "FF000000" }}
                            },
                            fill:{bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" }},
                            alignment: {vertical:"center", horizontal:"right"}
                        }
                    }]);
                console.log(ownTotal);
                //中心局汇总
                let centerTotal = 0 ;
                for (let i = 0 ; i < centerDepartmentLength; i ++){
                    centerTotal += dataIn["centerDepartment"][i][1];
                    data.push([
                        {
                            v:"中心局",
                            s:{
                                font: { sz: 11, bold: true,color: { rgb: "FFFFAA00" }},
                                alignment: {vertical:"center", horizontal:"center"}
                            }
                        },
                        {
                            v:dataIn["centerDepartment"][i][0],
                            s:{
                                border:{
                                    left: { style:"thin", color: { rgb: "FF000000" }},
                                    right: { style:"thin", color: { rgb: "FF000000" }},
                                    bottom: { style:"thin", color: { rgb: "FF000000" }}
                                },
                                alignment: {vertical:"center", horizontal:"left"}
                            }
                        },
                        {
                            v:dataIn["centerDepartment"][i][1],
                            s:{
                                border:{
                                    left: { style:"thin", color: { rgb: "FF000000" }},
                                    right: { style:"thin", color: { rgb: "FF000000" }},
                                    bottom: { style:"thin", color: { rgb: "FF000000" }}
                                },
                                alignment: {vertical:"center", horizontal:"right"}
                            }
                        }]);
                }
                data.push([
                    {
                        v:"本级汇总",
                        s:{
                            border:{
                                top: { style:"thin", color: { rgb: "FF000000" }},
                                right: { style:"thin", color: { rgb: "FF000000" }},
                                bottom: { style:"thin", color: { rgb: "FF000000" }}
                            },
                            fill:{bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" }},
                            alignment: {vertical:"center", horizontal:"center"}
                        }
                    },
                    {
                        v:"本级汇总",
                        s:{
                            border:{
                                top: { style:"thin", color: { rgb: "FF000000" }},
                                right: { style:"thin", color: { rgb: "FF000000" }},
                                bottom: { style:"thin", color: { rgb: "FF000000" }}
                            },
                            fill:{bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" }},
                            alignment: {vertical:"center", horizontal:"center"}
                        }
                    },
                    {
                        v: centerTotal,
                        s:{
                            border:{
                                top: { style:"thin", color: { rgb: "FF000000" }},
                                right: { style:"thin", color: { rgb: "FF000000" }},
                                bottom: { style:"thin", color: { rgb: "FF000000" }}
                            },
                            fill:{bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" }},
                            alignment: {vertical:"center", horizontal:"right"}
                        }
                    }]);
                console.log(centerTotal);
                //总汇总
                let total = centerTotal + ownTotal ;
                data.push([
                    {
                        v:"汇总",
                        s:{
                            border:{
                                top: { style:"thin", color: { rgb: "FF000000" }},
                                right: { style:"thin", color: { rgb: "FF000000" }},
                                bottom: { style:"thin", color: { rgb: "FF000000" }}
                            },
                            fill:{bgColor: { indexed: 64 }, fgColor: { rgb: "FF8C00" }},
                            alignment: {vertical:"center", horizontal:"center"}
                        }
                    },
                    {
                        v:"汇总",
                        s:{
                            border:{
                                top: { style:"thin", color: { rgb: "FF000000" }},
                                right: { style:"thin", color: { rgb: "FF000000" }},
                                bottom: { style:"thin", color: { rgb: "FF000000" }}
                            },
                            fill:{bgColor: { indexed: 64 }, fgColor: { rgb: "FF8C00" }},
                            alignment: {vertical:"center", horizontal:"center"}
                        }
                    },
                    {
                        v: total,
                        s:{
                            border:{
                                top: { style:"thin", color: { rgb: "FF000000" }},
                                right: { style:"thin", color: { rgb: "FF000000" }},
                                bottom: { style:"thin", color: { rgb: "FF000000" }}
                            },
                            fill:{bgColor: { indexed: 64 }, fgColor: { rgb: "FF8C00" }},
                            alignment: {vertical:"center", horizontal:"right"}
                        }
                    }]);
                const range = [
                    {s: {c: 0, r:0 }, e: {c:2, r:0}},

                    {s: {c: 0, r:2 }, e: {c:0, r:ownDepartmentLength+1}},
                    {s: {c: 0, r:ownDepartmentLength+2 }, e: { c: 1, r:ownDepartmentLength+2}},

                    {s: {c: 0, r:ownDepartmentLength+3 }, e: {c:0, r:centerDepartmentLength+ownDepartmentLength+2}},
                    {s: {c: 0, r:ownDepartmentLength+centerDepartmentLength+3 }, e: { c: 1, r:ownDepartmentLength+centerDepartmentLength+3}},

                    {s: {c: 0, r:ownDepartmentLength+centerDepartmentLength+4 }, e: { c: 1, r:ownDepartmentLength+centerDepartmentLength+4}},
                    ];
                const option = {
                    '!cols':[
                        { wpx: 150 },
                        { wpx: 150 },
                        { wpx: 150 },
                    ],
                    '!rows':[
                        { hpt: 150 },
                        { hpt: 15 },
                        { hpt: 60 }
                    ],
                    '!merges': range
                };

                let obj = [{ "name": fileName, "data": data }];
                let buffer = xlsx.build(obj,option); // returns a buffer
                console.log(fileName);
                fs.writeFileSync(path.join(downloadDir, fileName.replace(/\./g,"") + '.xlsx'), buffer);
                let url = path.join('/downloads/', fileName.replace(/\./g,"") + '.xlsx');
                resolve(url) ;
            }
            catch (e){
                console.log(e.stack);
                reject(e);
            }
            finally{
            }
        });
    }
}
module.exports = Excel;