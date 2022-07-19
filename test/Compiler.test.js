import Compiler from "../vm/Compiler";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    container.setAttribute("id", "app");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.remove();
    container = null;
});

test("模板编译", () => {
    let para1 = document.createElement('p');
    let node = document.createTextNode("\"1111\"{{$data.msg+'!'}}\"0000\"");
    para1.appendChild(node);

    let para2 = document.createElement('p');
    para2.setAttribute("v-text", "$data.msg");

    container.appendChild(para1)
    container.appendChild(para2)

    let compiler = new Compiler({
        $el: container,
        $data: {
            msg: 'hello world'
        },
        $methods: {
            handleClick: function () {
                this.msg = 'hello world'
            }
        }
    });
});