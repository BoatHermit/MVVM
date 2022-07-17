let $uid = 0;
export default class watcher {
    constructor(exp, scope, cb) {
        this.exp = exp;
        this.scope = scope;
        this.cb = cb;
        this.uid = $uid++;
    }

    /**
     * 计算表达式
     */
    get() {
    }

    /**
     * 完成回调函数的调用
     */
    update() {
        let newValue = this.get();
        this.cb && this.cb(newValue);
    }

    static computeExpression(exp, scope) {
        
    }
}