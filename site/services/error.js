
class Bill {
    constructor() {
    }
    static errorOutput(err) {
        try {
            console.log(err.stack);
            return res.json({
                code: 4004,
                msg: err.toString() || "未知错误",
                result: {}
            });
        }
        catch (err){
            console.log(err.stack);
            return res.json({
                code: 4004,
                msg: err.toString() || "未知错误",
                result: {}
            });
        }
    }
}