import {h} from "../lib/guide-mini-vue.esm.js"
window.self=null
export const App={
    // .vue
    render() {
        window.self=this
        return h('div',{
            id:'root',
            class:['red','hard'],
        },
        'hi ,'+this.msg
        // [h('p',{class:'red'},'hi'),h('p',{class:'blue'},'hi mini-vue')]
        )
    },
    setup(){
        return {
            msg:'mini-vue hahaha'
        }
    }
}