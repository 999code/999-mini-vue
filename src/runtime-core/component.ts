import { PublicInstanceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode){
    const component={
        vnode,
        type:vnode.type,
        setupState:{}
    }
    return component
}

export function setupComponent(instance){
    // todo
    // initProps
    // initSlots
    setupStatefulComponent(instance)
}
function setupStatefulComponent(instance: any) {
    instance.proxy=new Proxy({_:instance},PublicInstanceProxyHandlers)
    const Component=instance.type
    const {setup}=Component
    if(setup){
        // type function object
        const setupResult=setup()
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

