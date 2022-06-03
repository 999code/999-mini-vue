import { isObject } from "../shared"
import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandler"
export enum ReactiveFlags{
    IS_REACTIVE='__v_isReactive',
    IS_READONLY='__v_isReadonly',
}

export function isProxy(value){
    return isReactive(value) || isReadonly(value)
}
export function reactive(raw){
    return createReactiveObject(raw,mutableHandlers)
}

export function readonly(raw){
    return createReactiveObject(raw,readonlyHandlers)
}

export function shallowReadonly(raw){
    return createReactiveObject(raw,shallowReadonlyHandlers)
}
function createReactiveObject(target,baseHandlers){
    if(!isObject(target)){
        console.warn(`${target}必须是一个对象`)
        return target
    }
    return new Proxy(target,baseHandlers)
}

export function isReactive(value){
    return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value){
    return !!value[ReactiveFlags.IS_READONLY]
}


