let $uid = 0;
export default class Watcher {
    constructor(exp, scope, cb) {
        this.exp = exp;
        this.scope = scope;
        this.cb = cb;
        this.uid = $uid++;
        this.update();
    }

    /**
     * 计算表达式
     */
    get() {
        return Watcher.computeExpression(this.exp, this.scope);
    }

    /**
     * 完成回调函数的调用
     */
    update() {
        let newValue = this.get();
        this.cb && this.cb(newValue);
    }

    static computeExpression(exp, scope) {
        let fn = new Function("scope", "with(scope){return " + exp + "}");
        return fn(scope);
    }
}