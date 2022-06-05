import { shallowReadonly } from "../reactivity/reactive"
import { initProps } from "./componentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"
import { initSlots } from "./componentSlots"
import { emit } from "./componnetEmit"

export function createComponentInstance(vnode){
    const component={
        vnode,
        type:vnode.type,
        setupState:{},
        props:{},
        slots:{},
        emit:()=>{}
    }
    component.emit=emit.bind(null,component) as any
    return component
}

export function setupComponent(instance){
    // todo
    initProps(instance,instance.vnode.props)
    initSlots(instance,instance.vnode.children)
    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
    instance.proxy=new Proxy({_:instance},PublicInstanceProxyHandlers)
    const Component=instance.type
    const {setup}=Component
    if(setup){
        // type function object
        setCurrentInstance(instance)
        const setupResult=setup(shallowReadonly(instance.props),{
            emit:instance.emit
        })
        setCurrentInstance(null)
        handleSetupResult(instance,setupResult)

    }
}

function handleSetupResult(instance,setupResult: any) {
    if(typeof setupResult === 'object'){
        instance.setupState=setupResult
    }

    finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
    const Component=instance.type
    instance.render=Component.render
}

let currentInstance=null
export function getCurrentInstance(){
    return currentInstance
}

function setCurrentInstance(instance){
    currentInstance=instance
}
