export const extend=Object.assign
export const isObject=function(val){
    return val !== null && typeof val==='object'
}

export const hasChange=(newVal,val)=>{
    return !Object.is(newVal,val)
}