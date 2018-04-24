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
    static GetBillsGroupByTurnOutSubject(param) {
        return new Promise(async (resolve, reject) => {
            console.log('GetBillsGroupByTurnOutSubject');
            console.log(param);
            try {
                // let insSql = " and b.departmentId != '14' " ;
                // if (param["department"] == 'other'){
                //     insSql = "" ;
                // }
                let tempSql = "SELECT s.name as name, taxTurnOutSubjectId as id, sum(b.taxTurnOut) as sum " +
                    "FROM bill as b left join bill_taxTurnOutSubject as s on b.taxTurnOutSubjectId = s.id " +
                    `where authenticationDate = ?  and b.taxTurnOutSubjectId is not null and b.departmentId = '14' ` +
                    "group by b.taxTurnOutSubjectId ;";
                let value = [param["date"]] ;
                let strSql = mysql.format(tempSql, value) ;
                console.log(strSql);
                let centerRes = await DB.queryDbPromise(strSql);

                tempSql = "SELECT s.name as name, taxTurnOutSubjectId as id, sum(b.taxTurnOut) as sum " +
                    "FROM bill as b left join bill_taxTurnOutSubject as s on b.taxTurnOutSubjectId = s.id " +
                    `where authenticationDate = ? and b.taxTurnOutSubjectId is not null and b.departmentId != '14'` +
                    "group by b.taxTurnOutSubjectId ;";
                value = [param["date"]] ;
                strSql = mysql.format(tempSql, value) ;
                console.log(strSql);
                let ownRes = await DB.queryDbPromise(strSql);

                let resValue = {
                    centerDepartment:[],
                    ownDepartment:[]
                };
                for (let i = 0 ; i < ownRes.length ; i ++){
                    resValue.ownDepartment.push([ownRes[i].name, ownRes[i].sum])
                }
                for (let i = 0 ; i < centerRes.length ; i ++){
                    resValue.centerDepartment.push([centerRes[i].name, centerRes[i].sum])
                }
                resolve(resValue);
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