import DB from '../db/BaseDB';
import mysql from 'mysql';
let BillList = [];
class Bill {
    constructor(){}
    static AddBill(param) {
        return new Promise(async (resolve, reject) => {
            console.log(param);
            try {
                const sql = "INSERT INTO `bill` " +
                    "(`companyId`, `departmentId`, `matter`, `profession`, `billCode`, `billNumber`," +
                    " `money`, `tax`, `taxRate`, `total`, `remark`, " +
                    "`taxTurnOut`, `taxTurnOutSubjectId`, `taxDeduction`, `TurnOutDeductionRate`)" +
                    " VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? );";
                const {
                    companyId, department, matter, profession,
                    billCode, billNumber, money, rax, raxRate, total,
                    remark, taxTurnOut, taxTurnOutSubject, taxDeduction, TurnOutDeductionRate
                } = param;
                let values = [
                    companyId, department, matter, profession,
                    billCode, billNumber, money, rax, raxRate, total,
                    remark, taxTurnOut, taxTurnOutSubject, taxDeduction, TurnOutDeductionRate
                ];
                let sqlStr = mysql.format(sql, values);
                console.log(sqlStr);
                let res = await DB.queryDbPromise(sqlStr);
                resolve(res);
            }
            catch (e){
                console.log(e.stack);
                reject(e);
            }
        });
    };
    static DeleteBills(param) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = "DELETE FROM `bill` WHERE `id`= ? ;";
                const { id } = param;
                let values = [id];
                let sqlStr = mysql.format(sql, values);
                console.log(sqlStr);
                let res = await DB.queryDbPromise(sqlStr);
                resolve(res);
            }
            catch (e){
                console.log(e.stack);
                reject(e);
            }
        });
    };
    static GetBills(param) {
        return new Promise(async (resolve, reject) => {
            let page = param.page || 1;
            let limit = param.limit || 10;
            let options = [];
            console.log(param);
            try {
                for(let key in param){
                    if (key == "page" || key == "limit"){ continue ;}
                    if (param[key] == ""){ continue ;}
                    options.push({name:key, value:param[key]});
                }
                console.log(options);
                let sqlStr = "SELECT * FROM V_bill order by id desc;";
                if (options.length == 0 ){
                    sqlStr = "SELECT * FROM V_bill order by id desc;";
                }
                else {
                    if (options[0].name == 'company'){
                        let tempValue = mysql.format("?", `%${options[0]["value"]}%`);
                        sqlStr = `SELECT * FROM V_bill where companyName like ${tempValue} order by id desc;`;
                    }
                    else if (options[0].name == 'profession'){
                        let tempValue = mysql.format("?", `%${options[0]["value"]}%`);
                        sqlStr = `SELECT * FROM V_bill where profession like ${tempValue} order by id desc;`;
                    }
                    else if (options[0].name == 'department'){
                        let tempValue = mysql.format("?", `%${options[0]["value"]}%`);
                        sqlStr = `SELECT * FROM V_bill where departmentName like ${tempValue} order by id desc;`;
                    }
                    else if (options[0].name == 'billCode'){
                        let tempValue = mysql.format("?", `${options[0]["value"]}`);
                        sqlStr = `SELECT * FROM V_bill where billCode =  ${tempValue} order by id desc;`;
                    }
                    else if (options[0].name == 'billNumber'){
                        let tempValue = mysql.format("?", `${options[0]["value"]}`);
                        sqlStr = `SELECT * FROM V_bill where billNumber =  ${tempValue} order by id desc;`;
                    }
                }
                console.log(sqlStr);
                let res = await DB.queryDbPromise(sqlStr);
                resolve(res);
            }
            catch (e){
                console.log(e.stack);
                reject(e);
            }
        });
    };
    static GetProfessions(param) {
        return new Promise(async (resolve, reject) => {
            try {
                const sqlStr = "SELECT * FROM bill_profession;";
                console.log(sqlStr);
                let res = await DB.queryDbPromise(sqlStr);
                resolve(res);
            }
            catch (e){
                console.log(e.stack);
                reject(e);
            }
        });
    };
    static GetTaxTurnOutSubjectList(param) {
        return new Promise(async (resolve, reject) => {
            try {
                const sqlStr = "SELECT * FROM bill_taxTurnOutSubject;";
                console.log(sqlStr);
                let res = await DB.queryDbPromise(sqlStr);
                resolve(res);
            }
            catch (e){
                console.log(e.stack);
                reject(e);
            }
        });
    };

    static GetCloseTime(){
        return new Promise(async (resolve, reject) => {
            try {
                let sqlStr = "SELECT * FROM close_date order by id  desc  limit 1;";
                console.log(sqlStr);
                let res = await DB.queryDbPromise(sqlStr);
                resolve(res[0]);
            }
            catch (e){
                console.log(e.stack);
                reject(e);
            }
        });
    }
    static SetCloseTime(param){
        return new Promise(async (resolve, reject) => {
            try {
                const tempSql = "INSERT INTO `financial_receipt`.`close_date` (`date`) VALUES ( ? );";
                let values = [param];
                let sqlStr = mysql.format(tempSql, values);
                console.log(sqlStr);
                let res = await DB.queryDbPromise(sqlStr);
                resolve(res);
            }
            catch (e){
                console.log(e.stack);
                reject(e);
            }
        });
    }
}
module.exports = Bill;