import { extend } from "../shared";

let activeEffect
let shouldTrack
export class ReactiveEffect{
    private _fn:Function;
    deps=[]
    active=true
    onStop?:()=>void
    constructor(fn:Function,public scheduler?){
        this._fn=fn
        this.scheduler=scheduler
    }
    run(){
        // 1 会收集依赖
        // 使用shouldTrack来做区分
        if(!this.active){
            return this._fn()
        }else{
            activeEffect=this
            shouldTrack=true
            const result=this._fn()
            shouldTrack=false
            return result
        }
    }
    stop(){
        // 如果第一次执行 stop 后 active 就 false 了
        // 这是为了防止重复的调用，执行 stop 逻辑
        if(this.active){
            cleanUpEffect(this)
            if(this.onStop){
                this.onStop()
            }
            this.active=false
        }
    }
}

function cleanUpEffect(effect){
    effect.deps.forEach((dep:any)=>{
      dep.delete(effect)
    })
    effect.deps.length=0
}

const targetMap=new Map()
export function track(target,key){
    // target -> key -> dep
    // if(!activeEffect) return
    // if(!shouldTrack) return    
    if(!isTracking()) return
    let depsMap=targetMap.get(target)
    if(!depsMap){
        depsMap=new Map()
        targetMap.set(target,depsMap)
    }
    let dep=depsMap.get(key)    
    if(!dep){
        dep=new Set()
        depsMap.set(key,dep)
    }
    trackEffects(dep)
}


export function trackEffects(dep){
    if(dep.has(activeEffect)) return
    dep.add(activeEffect)
    activeEffect.deps.push(dep)

}

export function trigger(target,key){
    let depsMap=targetMap.get(target)
    let dep=depsMap.get(key)
    triggerEffects(dep)
}

export function triggerEffects(dep){
    for(const effect of dep){
        if(effect.scheduler){
            effect.scheduler()
        }else{
            effect.run()
        }
    }
}

export function isTracking(){
    return shouldTrack && activeEffect!==undefined //???
}

export function effect(fn:Function,options:any={}){
    // fn
    const scheduler=options.scheduler
    const _effect=new ReactiveEffect(fn,scheduler)
    _effect.onStop=options?.onStop
    extend(_effect,options)
    _effect.run();
    const runner:any=_effect.run.bind(_effect)
    runner.effect=_effect
    return runner
}


export function stop(runner):void{
    runner.effect.stop()
}


