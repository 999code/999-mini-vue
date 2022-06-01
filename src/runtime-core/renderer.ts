import { isObject } from "../shared"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode,container){
    patch(vnode,container)
}

function patch(vnode,container){
    // 去处理组件
    if(typeof vnode.type==="string"){
        processElement(vnode,container)
    }else if(isObject(vnode.type)){
        processComponent(vnode,container)
    }
}

function processElement(vnode: any, container: any) {
    mountElement(vnode,container)
}

function mountElement(vnode,container){
    const {type,children,props}=vnode
    const el=document.createElement(type)
    if(typeof children==='string'){
        el.textContent=children
    }else if(Array.isArray(children)){
        mountChildren(vnode,el)
    }
    for(const key in props){
        const val=props[key]
        el.setAttribute(key,val)
    }
    el.setAttribute('id','root')
    container.append(el)
}

function mountChildren(vnode,container){
    vnode.children.forEach(v=>{
        patch(v,container)
    })
}

function processComponent(vnode:any,container:any){
    mountComponent(vnode,container)
}
function mountComponent(vnode: any,container) {
    const instance=createComponentInstance(vnode)
    setupComponent(instance)
    setupRenderEffect(instance,container)
}

function setupRenderEffect(instance,container) {
    const subTree=instance.render()
    // vnode-->patch
    // vnode-->element-->patchElement
    patch(subTree,container)
}

