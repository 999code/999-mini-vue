import {h} from "../lib/guide-mini-vue.esm.js"

export const App={
    // .vue
    render() {
        return h('div',{
            id:'root',
            class:['red','hard'],
        },
        [h('p',{class:'red'},'hi'),h('p',{class:'blue'},'hi mini-vue')])
    },
    setup(){
        return {
            msg:'mini-vue'
        }
    }
}