import Observer from "./Observer";
import Compiler from "./Compiler";

export default class VM {
    constructor(options) {
        this.$el = document.querySelector(options.el);
        this.$data = options.data || {};
        this.$methods = options.methods;

        this._proxyData(this.$data)
        this._proxyMethods(this.$methods)

        new Observer(this.$data);
        this.tmp = new Compiler(this);
    }

    /**
     * 数据的代理
     * @param data
     * @private
     */
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                set(newValue) {
                    data[key] = newValue;
                },
                get() {
                    return data[key];
                }
            })
        })
    }

    /**
     * 函数的代理
     * @param methods
     * @private
     */
    _proxyMethods(methods) {
        if (methods && typeof methods === 'object') {
            Object.keys(methods).forEach(key => {
                this[key] = methods[key];
            })
        }
    }
}
window.VM = VM;