import { ShapeFlags } from "../shared/shapeFlags";

export function initSlots(instance, children) {
    const { vnode } = instance;
  
    console.log("初始化 slots");
  
    if (vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN) {
      normalizeObjectSlots(children, (instance.slots = {}));
    }
  }
function normalizeObjectSlots(children:any,slots:any){
    for(const key in children){
        const value=children[key]
        slots[key]=(props)=>normalizeSlotValue(value(props))
    }
}


function normalizeSlotValue(value){
    return Array.isArray(value)?value:[value]
}
