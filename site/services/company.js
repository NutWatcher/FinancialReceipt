import DB from '../db/BaseDB';
import mysql from 'mysql';
class Company {
    constructor(){}
    static SearchCompany(param) {
        return new Promise(async (resolve, reject) => {
            try {
                const tempStr = "SELECT * FROM company";
                let sqlStr = tempStr;
                if (param["name"] != ""){
                    let tempValue = mysql.format("?", `%${param["name"]}%`);
                    sqlStr = `${tempStr} where name like ${tempValue} `;
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
    static GetIdByInitCompanyName(name) {
        return new Promise(async (resolve, reject) => {
            try {
                const tempStr = "SELECT * FROM company where name = ? limit 1 ";
                const tempAddStr = "INSERT INTO `company` (`name`) VALUES (?);";
                let values = [name];
                let sqlStr = mysql.format(tempStr, values);
                console.log(sqlStr);
                let res = await DB.queryDbPromise(sqlStr);
                if (res.length > 0 ){
                    return resolve(res[0]);
                }

                //add company
                sqlStr = mysql.format(tempAddStr, values);
                console.log(sqlStr);
                await DB.queryDbPromise(sqlStr);
                sqlStr = mysql.format(tempStr, values);
                console.log(sqlStr);
                res = await DB.queryDbPromise(sqlStr);
                resolve(res[0]);
            }
            catch (e){
                console.log(e.stack);
                reject(e);
            }
        });
    };
}
module.exports = Company;