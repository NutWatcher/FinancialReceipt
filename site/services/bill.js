let BillList = [];
class Bill {
    constructor(){}
    static AddBill = (param) => {
        BillList.push(param);
    };
    static GetBills = () => {
        return BillList ;
    };
}
module.exports = Bill;