import DB from '../db/BaseDB';
let BillList = [];
class Bill {
    constructor(){}
    static AddBill(param) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await DB.queryDbPromise("select 1");
                BillList.push(param);
                resolve(res);
            }
            catch (err){
                console.log(e.stack);
                reject(err);
            }
        });
    };
    static GetBills() {
        return BillList ;
    };
}
module.exports = Bill;