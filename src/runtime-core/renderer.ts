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
    const el=(vnode.el= document.createElement(type))
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

function mountComponent(initialVnode: any,container) {
    const instance=createComponentInstance(initialVnode)
    setupComponent(instance)
    setupRenderEffect(instance,initialVnode,container)
}

function setupRenderEffect(instance,initialVnode,container) {
    const {proxy}=instance
    const subTree=instance.render.call(proxy)
    // initialVnode-->patch
    // initialVnode-->element-->patchElement
    patch(subTree,container)
    initialVnode.el=subTree.el
}

