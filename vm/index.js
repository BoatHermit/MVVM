import Observer from "./Observer";
import Compiler from "./Compiler";

class VM {
    constructor(options) {
        this.$el = document.querySelector(options.el);
        this.$data = options.data || {};

        new Observer(this.$data);
        new Compiler(this);
    }
}
window.VM = VM;