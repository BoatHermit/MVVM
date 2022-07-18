export default class Dep {
    static target;
    constructor() {
        //存放所有Watcher
        this.subs = {};
    }

    /**
     *  添加Watcher
     * @param target
     */
    addSub(target) {
        this.subs[target.uid] = target;
    }

    /**
     * 通知所有Watcher数据变化
     */
    notify() {
        for (let uid in this.subs) {
            this.subs[uid].update();
        }
    }
}