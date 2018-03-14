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
}
module.exports = Company;