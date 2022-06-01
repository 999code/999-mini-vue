const PublicPropertiesMap={
    $el:(i)=>i.vnode.el
}


export const PublicInstanceProxyHandlers={
    get({_:instance},key){
        const {setupState}=instance
        if(key in setupState){
            return setupState[key]
        }
        const publicGetter= PublicPropertiesMap[key]
        if(publicGetter){
            return publicGetter(instance)
        }
    }
}