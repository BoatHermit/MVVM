import Dep from "../vm/Dep";

test("Dep.addSub", () => {
    let dep = new Dep();
    let t1 = { uid: 1 };
    let t2 = { uid: 2 };
    dep.addSub(t1);
    dep.addSub(t2);
    expect(dep.subs[1]).toEqual(t1);
    expect(dep.subs[2]).toEqual(t2);
});