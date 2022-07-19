import VM from "../vm/VM";

let vm = null;
beforeEach(() => {
    vm = new VM({
        el: '#app',
        data: {
            msg: 'hello world',
            info: {
                info1: "111",
                info2: "222"
            }
        },
        methods: {
            handleClick: function () {
                this.msg = 'hello world'
            },
            printData: function () {
                console.log(data);
            }
        }
    });
});

afterEach(() => {
    vm = null;
});

test("数据代理", () => {
    expect(vm.info).toEqual({
        info1: "111",
        info2: "222"
    })
    expect(vm.msg).toEqual('hello world');
    vm.msg = '你好';
    expect(vm.msg).toEqual('你好');
    vm.handleClick();
    expect(vm.msg).toEqual('hello world');
});

// test("集成测试", () => {
//
// });