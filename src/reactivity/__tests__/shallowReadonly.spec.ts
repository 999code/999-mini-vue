import { isReactive, isReadonly, readonly, shallowReadonly } from "../reactive";

describe("shallowReadonly", () => {
  test("should not make non-reactive properties reactive", () => {
    const props = shallowReadonly({ n: { foo: 1 } });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.n)).toBe(false);
  });

  it('warn when call set',()=>{
    // console.warn
    // mock
    const user=readonly({
        age:10
    })
    user.age=11
    console.warn=jest.fn()
    user.age=11
    expect(console.warn).toBeCalled()
    })
});
