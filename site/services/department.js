import DB from '../db/BaseDB';
import mysql from 'mysql';
class Department {
    constructor(){}
    static GetDepartments(param) {
        return new Promise(async (resolve, reject) => {
            try {
                const sqlStr = "SELECT * FROM department;";
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
module.exports = Department;