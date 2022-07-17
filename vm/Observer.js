export default class Observer {
    constructor(data) {
        this.data = data;
        this.walk(this.data)
    }

    /**
     * 遍历对象
     * @param data
     */
    walk(data) {
        if (!data || typeof data != 'object') {
            return;
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        });
    }

    /**
     * 动态设置响应式数据
     * @param data
     * @param key
     * @param value
     */
    defineReactive(data, key, value) {
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: () => {
                console.log('get');
                return value;
            },
            set: (newValue) => {
                if(value === newValue){
                    return
                }
                console.log('set');
                value = newValue;
                //TODO 触发View页面的变化
            }
        });
        this.walk(value);
    }
}