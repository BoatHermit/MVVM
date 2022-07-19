import Watcher from "./Watcher";

export default class Compiler {
    constructor(context) {
        this.$el = context.$el;
        this.context = context;

        if (this.$el) {
            this.$fragment = this.node2Fragment(this.$el);
            this.compiler(this.$fragment);
            this.$el.appendChild(this.$fragment);
        }
    }

    /**
     * 把所有元素转为文档片段
     * @param node
     */
    node2Fragment(node) {
        let fragment = document.createDocumentFragment();
        if (node.childNodes && node.childNodes.length) {
            node.childNodes.forEach(child => {
                if (!this.ignorable(child)) {
                    fragment.append(child);
                }
            });
        }
        return fragment;
    }

    /**
     * 忽略那些节点不添加到文档片段
     * @param node
     */
    ignorable(node) {
        let reg = /^[\t\n\r]+/;
        return (
            node.nodeType === 8
            || (node.nodeType === 3 && reg.test(node.textContent))
        );
    }

    /**
     * 模板编译
     * @param node
     */
    compiler(node) {
        if (node.childNodes && node.childNodes.length) {
            node.childNodes.forEach(child => {
                if (child.nodeType === 1) {
                    // nodeType === 1, child为元素节点
                    this.compilerElementNode(child);
                } else if (child.nodeType === 3) {
                    // nodeType === 3, child为文本节点
                    this.compilerTextNode(child);
                }
            });
        }
    }

    /**
     * 编译元素节点
     * @param node
     */
    compilerElementNode(node) {
        let that = this;
        let attrs = [...node.attributes];
        attrs.forEach(attr => {
            let {name: attrName, value: attrValue} = attr;
            if (attrName.indexOf("v-")===0) {
                let diName = attrName.slice(2);
                switch (diName) {
                    case "text":
                        new Watcher(attrValue, this.context, newValue => {
                           node.textContent = newValue;
                        });
                        break;
                    case "model":
                        this.tmp = new Watcher(attrValue, this.context, newValue => {
                            node.value = newValue;
                        });
                        node.addEventListener("input", e => {
                            that.context[attrValue] = e.target.value;
                        });
                        break;

                }
            } else if (attrName.indexOf("@")===0) {
                this.compilerMethods(this.context, node, attrName, attrValue);
            }
        });
        this.compiler(node);
    }

    /**
     * 函数编译
     * @param scope
     * @param node
     * @param attrName
     * @param attrValue
     */
    compilerMethods(scope, node, attrName, attrValue) {
        let type = attrName.slice(1);
        let fn = scope[attrValue];
        node.addEventListener(type, fn.bind(scope));
    }

    /**
     * 编译文本节点
     * @param node
     */
    compilerTextNode(node) {
        let text = node.textContent.trim();
        if (text) {
            let exp = this.parseTextExp(text);
            new Watcher(exp, this.context, newValue => {
                node.textContent = newValue;
            });
        }
    }

    /**
     * 文本到表达式的转换
     * @param text
     */
    parseTextExp(text) {
        // 匹配插值表达式的正则
        let regText = /{{(.+?)}}/g;
        let pieces = text.split(regText);
        let matches = text.match(regText);
        let tokens = [];
        pieces.forEach(item => {
           if (matches &&
               matches.indexOf("{{" + item + "}}" > -1)) {
               tokens.push("(" + item + ")");
           } else {
               tokens.push("`" + item + "`");
           }
        });
        return tokens.join("+");
    }
}