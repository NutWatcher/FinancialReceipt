import DB from '../db/BaseDB';
import mysql from 'mysql';
let BillList = [];
class Bill {
    constructor(){}
    static AddBill(param) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = "INSERT INTO `bill` " +
                    "(`companyId`, `departmentId`, `matter`, `profession`, `billCode`, `billNumber`, `money`, `tax`, `taxRate`, `total`, `remark`, `taxTurnOut`, `taxTurnOutSubject`, `taxDeduction`, `TurnOutDeductionRate`)" +
                    " VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? );";
                const {
                    company, department, matter, profession,
                    billCode, billNumber, money, rax, raxRate, total,
                    remark, taxTurnOut, taxTurnOutSubject, taxDeduction, TurnOutDeductionRate
                } = param;
                let values = [
                    company, department, matter, profession,
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
            try {
                const sqlStr = "SELECT * FROM V_bill order by id desc;";
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
}
module.exports = Bill;