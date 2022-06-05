import { isObject } from "../shared"
import { ShapeFlags } from "../shared/shapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { Fragment,Text } from "./vnode"

export function render(vnode,container){
    patch(vnode,container)
}

function patch(vnode,container){
    // 去处理组件
    const {type,shapeFlag}=vnode
    // Fragment 只渲染children
    switch(type){
        case Fragment:
            processFragment(vnode,container)
            break
        case Text:
            processText(vnode,container)
            break
        default:
            if(shapeFlag & ShapeFlags.ELEMENT){
                processElement(vnode,container)
            }else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
                processComponent(vnode,container)
            }
            break
    }
}

function processFragment(vnode,container){
    mountChildren(vnode,container)
}

function processElement(vnode: any, container: any) {
    mountElement(vnode,container)
}

function mountElement(vnode,container){
    const {type,children,props,shapeFlag}=vnode
    const el=(vnode.el= document.createElement(type))
    if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
        el.textContent=children
    }else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN){
        mountChildren(vnode,el)
    }
    for(const key in props){
        const val=props[key]
        const isOn=(key:string)=>/^on[A-Z]/.test(key)
        if(isOn(key)){
            const event=key.slice(2).toLowerCase()
            el.addEventListener(event,val)
        }else{
            el.setAttribute(key,val)
        }
    }
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
    // debugger
    const subTree=instance.render.call(proxy)
    // initialVnode-->patch
    // initialVnode-->element-->patchElement
    patch(subTree,container)
    initialVnode.el=subTree.el
}

function processText(vnode: any, container: any) {
    const {children}=vnode
    const textNode=(vnode.el=document.createTextNode(children))
    container.append(textNode)
}

