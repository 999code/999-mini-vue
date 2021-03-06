import { isProxy, isReadonly, readonly } from "../reactive"

describe('readonly',()=>{
    it('happy path',()=>{
        const original={
            foo:1,
            bar:{baz:2},
        }
        const wrapped=readonly(original)
        expect(wrapped).not.toBe(original)
        expect(wrapped.foo).toBe(1)
        expect(isReadonly(original)).toBe(false)
        expect(isReadonly(wrapped)).toBe(true)
        expect(isReadonly(wrapped.bar)).toBe(true)
        expect(isProxy(wrapped)).toBe(true)
    })
    
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
})
        