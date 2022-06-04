import { ShapeFlags } from "../shared/shapeFlags";

export function createVnode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    el: null,
    shapeFlag: getShapeFlag(type),
  };
  if (typeof children === "string") {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  } else {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  }
  if(vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
    if(typeof children==='object'){
      vnode.shapeFlag|=ShapeFlags.SLOTS_CHILDREN
    }
  }
  return vnode;
}

function getShapeFlag(type: any) {
  return typeof type === "string"
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT;
}
