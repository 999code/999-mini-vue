import {h} from "../../lib/guide-mini-vue.esm.js"

import {Foo} from "./Foo.js"

window.self=null
export const App={
    // .vue
    render() {
        window.self=this
        return h('div',{
            id:'root',
            class:['red','hard'],
            onClick(){
                // console.log('click');
            },
            onMouseOver(){
                // console.log('mouseover');
            }
        },
        [h('div',{},'hi ,'+this.msg),h(Foo,{
            onAdd(a,b){
                console.log('onAdd',a,b);
            },
            onAddFoo(){
                console.log('onAddFoo');
            }
        })]
        // [h('p',{class:'red'},'hi'),h('p',{class:'blue'},'hi mini-vue')]
        )
    },
    setup(){
        return {
            msg:'mini-vue hahaha'
        }
    }
}