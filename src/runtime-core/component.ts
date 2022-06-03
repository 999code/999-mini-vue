import { shallowReadonly } from "../reactivity/reactive"
import { initProps } from "./componentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"
import { emit } from "./componnetEmit"

export function createComponentInstance(vnode){
    const component={
        vnode,
        type:vnode.type,
        setupState:{},
        props:{},
        emit:()=>{}
    }
    component.emit=emit.bind(null,component) as any
    return component
}

export function setupComponent(instance){
    // todo
    initProps(instance,instance.vnode.props)
    // initSlots
    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
    instance.proxy=new Proxy({_:instance},PublicInstanceProxyHandlers)
    const Component=instance.type
    const {setup}=Component
    if(setup){
        // type function object
        const setupResult=setup(shallowReadonly(instance.props),{
            emit:instance.emit
        })
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

