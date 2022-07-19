import Observer from "../vm/Observer";

test('数据劫持', () => {
    let srcData = {
        msg: "hello",
        info: {
            info1: "111",
            info2: "222"
        }
    };
    let desData = {
        msg: "hello",
        info: {
            info1: "111",
            info2: "222"
        }
    };
    let observer = new Observer(srcData);
    expect(observer.data).toBe(srcData);
    expect(observer.data.msg).toEqual(desData.msg);
    expect(observer.data.info).toEqual(desData.info);

    let newMsg = "hello";
    observer.data.msg = newMsg;
    expect(srcData.msg).toEqual(newMsg);
    newMsg = "你好";
    observer.data.msg = newMsg;
    expect(srcData.msg).toEqual(newMsg);

    let newInfo = {
        info1: "aaa",
        info2: "bbb"
    };
    observer.data.info = newInfo;
    expect(srcData.info).toEqual(newInfo);
});