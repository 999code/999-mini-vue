import { hasChange, isObject } from "../shared"
import { isTracking, trackEffects, triggerEffects } from "./effect"
import { reactive } from "./reactive"


class RefImpl{
    private _value:any
    public dep
    private _rawValue
    public __v_isRef=true
    constructor(value){
        this._rawValue=value
        this._value = convert(value)
        this.dep=new Set()
    }
    get value(){
        trackRefValue(this)
        return this._value
    }
    set value(newVal){
        if(hasChange(newVal,this._rawValue)){
            this._rawValue=newVal
            this._value=convert(newVal)
            triggerEffects(this.dep)
        }
    }
}
function convert(value){
    return isObject(value)?reactive(value):value
}

function trackRefValue(ref){
    if(isTracking()){
        trackEffects(ref.dep)
    }
}
export function ref(value){
    return new RefImpl(value)
}

export function isRef(ref){
    return !!ref.__v_isRef
}


export function unRef(ref){
    return isRef(ref)?ref.value:ref
}

export function proxyRefs(objectWithRefs){
    return new Proxy(objectWithRefs,{
        // get --> age(ref) 那么就返回.value
        // not ref -> 直接返回
        get(target,key){
            return unRef(Reflect.get(target,key))  //??Reflect和target[key]有什么区别
        },
        set(target,key,value){
            if(isRef(target[key]) && !isRef(value)){
                return target[key].value=value
            }else{
                Reflect.set(target,key,value)
            }            
        }
    })
}



